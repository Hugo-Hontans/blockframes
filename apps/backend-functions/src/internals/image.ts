import { db, functions } from './firebase';
import { tmpdir } from 'os';
import { join, dirname } from 'path';
import * as admin from 'firebase-admin';
import { ensureDir, remove } from 'fs-extra';
import sharp from 'sharp';
import { set } from 'lodash';
import { imgSizeDirectory } from '@blockframes/utils/media/media.firestore';
import { getDocument } from '../data/internals';

/**
 * This function is executed on every files uploaded on the storage.
 * Here we use it to resize images, but it can also be used to perform
 * any kind of image manipulation (like blur, crop...).
 */
export async function onFileUploadEvent(data: functions.storage.ObjectMetadata) {
  // If the type of the data is not an image, exit the function
  if (!data.contentType?.includes('image')) {
    console.log(`File ${data.contentType} is not an image, exiting function`);
    return false;
  }

  // we don't want to resize a vector image because:
  // 1) vector are resizable at will by design
  // 2) it will crash the resize program
  if (data.contentType === 'image/svg+xml') {
    console.log('File is an SVG image, exiting function');
    return false;
  }

  try {
    // Resize the image
    await resize(data);

    return true;
  } catch (err) {
    // TODO: Add sentry to handle errors
    console.log(err.message);
    console.log(err);
    return false;
  }
}

async function resize(data: functions.storage.ObjectMetadata) {
  // Get all the needed information from the data (bucket, path, file name and directory)
  const bucket = admin.storage().bucket(data.bucket);
  const filePath = data.name;

  if (filePath === undefined) {
    throw new Error('undefined data.name!');
  }

  const filePathElements = filePath.split('/');

  if (filePathElements.length !== 5) {
    throw new Error('unhandled filePath:' + filePath);
  }

  const [collection, id, fieldToUpdate, uploadedSize, fileName] = filePathElements;

  if (uploadedSize !== 'original') {
    console.info('skipping upload that is not "original": ' + uploadedSize);
    return false;
  }

  const directory = dirname(filePath);
  const workingDir = join(tmpdir(), 'tmpFiles');
  const tmpFilePath = join(workingDir, 'source.webp');

  // Ensure directory exists with fs.ensureDir
  await ensureDir(workingDir);
  await bucket.file(filePath).download({ destination: tmpFilePath });

  // Define the sizes (here width) depending of the image format (defined by the directory)
  let sizes: {
    original: number;
    xs: number;
    md: number;
    lg: number;
  };

  if (directory.includes('avatar')) {
    sizes = { original: 0, xs: 50, md: 100, lg: 300 };
  } else if (directory.includes('logo')) {
    sizes = { original: 0, xs: 50, md: 100, lg: 300 };
  } else if (directory.includes('poster')) {
    sizes = { original: 0, xs: 200, md: 400, lg: 600 };
  } else if (directory.includes('banner')) {
    sizes = { original: 0, xs: 300, md: 600, lg: 1200 };
  } else if (directory.includes('still')) {
    sizes = { original: 0, xs: 50, md: 100, lg: 200 };
  } else {
    console.warn('No bucket directory, exiting function');
    return false;
  }

  // Iterate on each item of sizes array to generate all wanted resized images
  const uploadPromises = Object.entries(sizes).map(async ([key, size]) => {
    const resizedImgName = fileName;
    const resizedImgPath = join(workingDir, `${key}_${resizedImgName}`);
    let destination: string;

    if (size !== 0) {
      // In this condition, we need to resize the image
      destination = join(directory.replace('original', key), resizedImgName);
      // Use sharp to resize : take a path, resize to wanted size, save file to a new path
      await sharp(tmpFilePath)
        .resize(size)
        .toFile(resizedImgPath);

      const file = bucket.file(destination);
      const [signedUrl] = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-3000',
        version: 'v2'
      });

      // Then upload the resized image on the bucket
      await bucket.upload(resizedImgPath, {
        destination
      });

      return { key, url: signedUrl };
    } else {
      // Here we handle the original and generate a signed url (access token)
      destination = join(directory, fileName);
      const file = bucket.file(destination);
      const [signedUrl] = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-3000',
        version: 'v2'
      });

      return { key, url: signedUrl };
    }
  });

  const uploaded = await Promise.all(uploadPromises);

  await db.runTransaction(async tx => {
    const doc = await tx.get(db.doc(`${collection}/${id}`));
    const docData = await doc.data();

    if (docData === undefined) {
      throw new Error('Data is undefined');
    }

    // format an array of {key, value}[] into a record of {key1: value1, key2: value2, ...}
    // TODO#2882
    const urls: Record<string, string> = {};
    for (const { key, url } of uploaded) {
      urls[key] = url;
    }

    const value = { ref: filePath, urls };

    const updated = set(docData, fieldToUpdate, value);
    return tx.set(doc.ref, updated);
  });

  // Delete the temporary working directory after successfully uploading the resized images with fs.remove
  return remove(workingDir);
}

export async function onImageDeletion(data: functions.storage.ObjectMetadata) {

  // Get all the needed information from the data (bucket, path, file name and directory)
  const bucket = admin.storage().bucket(data.bucket);
  const filePath = data.name;

  if (filePath === undefined) {
    throw new Error('undefined data.name!');
  }

  const filePathElements = filePath.split('/')
  const [collection, id, fieldToUpdate] = filePathElements;

  if (filePathElements.length !== 5) {
    throw new Error('unhandled filePath:' + filePath);
  }

  try {
    // Clean document that reference this image
    const docData: any = await getDocument(`${collection}/${id}`);
    const value = { ref: '', urls: [] };
    const updated = set(docData, fieldToUpdate, value);
    const docRef = db.collection(collection).doc(id);
    await docRef.update(updated);
  } catch (e) {
    console.log(`Error while updating image references in document "${collection}/${id}" : ${e.message}`);
  }

  // By filtering out the uploadedSize path, we make sure, that we don't try to delete an already deleted image
  imgSizeDirectory.forEach(async (sizeDir: string) => {
    const path = `${filePathElements[0]}/${filePathElements[1]}/${filePathElements[2]}/${sizeDir}/${filePathElements[4]}`;
    const exists = await bucket.file(path).exists();
    if (exists) {
      await bucket.file(path).delete();
      return true;
    } else {
      throw new Error(`${path}: couldn't be found`)
    }
  })
}
