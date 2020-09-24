import { functions, getStorageBucketName } from './internals/firebase';
import * as admin from 'firebase-admin';
import { get } from 'lodash';
import { createHash } from 'crypto';
import { CallableContext } from 'firebase-functions/lib/providers/https';
import { imgixToken } from './environments/environment';
import { ImageParameters, formatParameters } from '@blockframes/media/directives/image-reference/imgix-helpers';
import { getDocAndPath } from '@blockframes/firebase-utils';
import { createPublicUser, PublicUser } from '@blockframes/user/types';
import { createOrganizationBase, OrganizationDocument } from '@blockframes/organization/+state/organization.firestore';
import { privacies, Privacy } from '@blockframes/utils/file-sanitizer';
import { MovieDocument } from './data/types';

/**
 * This function is executed on every files uploaded on the tmp directory of the storage.
 * It check if a new file in tmp directory is already referenced on DB and movie it to correct folder
 */
export async function linkFile(data: functions.storage.ObjectMetadata) {
  // get the needed values
  const { filePath, fieldToUpdate, isInTmpDir, docData } = await getDocAndPath(data.name);

  if (isInTmpDir && data.name) {
    let savedRef: string | Array<{ ref: string }> = get(docData, fieldToUpdate);

    if (Array.isArray(savedRef)) {
      savedRef = savedRef.map(e => e.ref).find(ref => ref === filePath) || '';
    }

    const bucket = admin.storage().bucket(getStorageBucketName());
    const from = bucket.file(data.name);
    if (filePath === savedRef) {
      const to = bucket.file(filePath);
      const [exists] = await from.exists();
      if (exists) {
        // Copy file to new location
        await from.copy(to);
        // Remove previous
        await from.delete();
      }
      return true;
    } else {
      // If the ref is not found on db, we delete the file because it means that it is lost
      await from.delete();
    }

  }
  return false;
}

/**
 * Generates an Imgix token for a given protected resource
 * Protected resources are in the "protected" dir of the bucket.
 * An Imgix source must be configured to that directory and marked as private
 *
 * @param data
 * @param context
 * @see https://github.com/imgix/imgix-blueprint#securing-urls
 * @see https://www.notion.so/cascade8/Setup-ImgIx-c73142c04f8349b4a6e17e74a9f2209a
 */
export const getMediaToken = async (data: { ref: string, parametersSet: ImageParameters[] }, context: CallableContext): Promise<string[]> => {

  if (!context?.auth) { throw new Error('Permission denied: missing auth context.'); }

  const canAccess = await isAllowedToAccessMedia(data.ref, context.auth.uid);
  if (!canAccess) {
    throw new Error('Permission denied. User is not allowed');
  }

  return data.parametersSet.map((p: ImageParameters) => {
    const params = formatParameters(p);
    let toSign = `${imgixToken}${data.ref}`;

    if (!!params) {
      toSign = `${toSign}?${params}`;
    }

    return createHash('md5').update(toSign).digest('hex');
  });

}

export const deleteMedia = async (ref: string): Promise<void> => {

  const bucket = admin.storage().bucket(getStorageBucketName());
  const file = bucket.file(ref);

  const [exists] = await file.exists();
  if (!exists) {
    throw new Error('Upload Error : File does not exists in the storage');
  }

  await file.delete();
}

async function isAllowedToAccessMedia(ref: string, uid: string): Promise<boolean> {
  const pathInfo = getPathInfo(ref);
  const db = admin.firestore();

  const user = await db.collection('users').doc(uid).get();
  if (!user.exists) { return false; }
  const userDoc = createPublicUser(user.data());

  const blockframesAdmin = await db.collection('blockframesAdmin').doc(uid).get();
  if (blockframesAdmin.exists) { return true; }

  switch (pathInfo.collection) {
    case 'users':
      return pathInfo.docId === uid;
    case 'orgs':
      if (!userDoc.orgId) { return false; }
      return pathInfo.docId === userDoc.orgId;
    case 'movies':
      if (!userDoc.orgId) { return false; }
      const org = await db.collection('orgs').doc(userDoc.orgId).get();
      const orgDoc = createOrganizationBase(org.data());
      return orgDoc.movieIds.some(id => pathInfo.docId === id);
    default:
      return false;
  }
}

interface PathInfo { securityLevel: Privacy, collection: string, docId: string }

function getPathInfo(ref: string) {
  const refParts = ref.split('/');

  // if ref starts with `/` refParts[0] will be ""
  if (ref.startsWith('/')) {
    refParts.shift();
  }

  const pathInfo: PathInfo = {
    securityLevel: 'protected', // protected by default
    collection: '',
    docId: '',
  };

  if (privacies.includes(refParts[0] as any)) {
    pathInfo.securityLevel = refParts.shift()! as Privacy;
  }

  pathInfo.collection = refParts.shift()!;
  pathInfo.docId = refParts.shift()!;

  return pathInfo;
}


export async function cleanUserMedias(before: PublicUser, after?: PublicUser): Promise<void> {
  const mediasToDelete = [];
  if (!!after) { // Updating
    // Check if avatar have been changed/removed
    if (!!before.avatar && (before.avatar !== after.avatar || after.avatar === '')) { // Avatar was previously setted and was updated or removed
      mediasToDelete.push(before.avatar);
    }
  } else { // Deleting
    if (!!before.avatar) {
      mediasToDelete.push(before.avatar);
    }

    if (!!before.watermark) {
      mediasToDelete.push(before.watermark);
    }
  }

  await Promise.all(mediasToDelete.map(m => deleteMedia(m)));
}

export async function cleanOrgMedias(before: OrganizationDocument, after?: OrganizationDocument): Promise<void> {
  const mediasToDelete = [];
  if (!!after) { // Updating
    if (!!before.logo && (before.logo !== after.logo || after.logo === '')) {
      mediasToDelete.push(before.logo);
    }

    if (before.documents?.notes.length) {
      before.documents.notes.forEach(nb => {
        if (!after.documents?.notes.length || !after.documents.notes.some(na => na.ref === nb.ref)) {
          mediasToDelete.push(nb.ref);
        }
      });
    }

  } else { // Deleting
    if (!!before.logo) {
      mediasToDelete.push(before.logo);
    }

    if (before.documents?.notes.length) {
      before.documents.notes.forEach(n => mediasToDelete.push(n.ref));
    }
  }

  await Promise.all(mediasToDelete.map(m => deleteMedia(m)));
}

export async function cleanMovieMedias(before: MovieDocument, after?: MovieDocument): Promise<void> {
  const mediasToDelete = [];
  if (!!after) { // Updating
    if (!!before.banner && (before.banner !== after.banner || after.banner === '')) {
      mediasToDelete.push(before.banner);
    }

    if (!!before.poster && (before.poster !== after.poster || after.poster === '')) {
      mediasToDelete.push(before.poster);
    }

    if (!!before.promotional.presentation_deck && (before.promotional.presentation_deck !== after.promotional.presentation_deck || after.promotional.presentation_deck === '')) {
      mediasToDelete.push(before.promotional.presentation_deck);
    }

    if (!!before.promotional.scenario && (before.promotional.scenario !== after.promotional.scenario || after.promotional.scenario === '')) {
      mediasToDelete.push(before.promotional.scenario);
    }

    if (!!before.promotional.moodboard && (before.promotional.moodboard !== after.promotional.moodboard || after.promotional.moodboard === '')) {
      mediasToDelete.push(before.promotional.moodboard);
    }

    Object.keys(before.promotional.still_photo)
      .filter(key => !!before.promotional.still_photo[key])
      .forEach(key => {
        const stillBefore = before.promotional.still_photo[key];
        const stillAfter = after.promotional.still_photo[key];
        if ((stillBefore !== stillAfter || stillAfter === '')) {
          mediasToDelete.push(stillBefore);
        }
      });

  } else { // Deleting

    if (!!before.banner) {
      mediasToDelete.push(before.banner);
    }

    if (!!before.poster) {
      mediasToDelete.push(before.poster);
    }

    if (!!before.promotional.presentation_deck) {
      mediasToDelete.push(before.promotional.presentation_deck);
    }

    if (!!before.promotional.scenario) {
      mediasToDelete.push(before.promotional.scenario);
    }

    if (!!before.promotional.moodboard) {
      mediasToDelete.push(before.promotional.moodboard);
    }

    Object.keys(before.promotional.still_photo)
      .filter(key => !!before.promotional.still_photo[key])
      .forEach(key => mediasToDelete.push(before.promotional.still_photo[key]));
  }

  await Promise.all(mediasToDelete.map(m => deleteMedia(m)));

}
