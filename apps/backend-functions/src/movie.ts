import { functions, db } from './internals/firebase';
import { MovieDocument, OrganizationDocument, PublicUser, StoreConfig, PublicOrganization } from './data/types';
import { triggerNotifications, createNotification } from './notification';
import { getDocument, getOrganizationsOfMovie } from './data/internals';
import { removeAllSubcollections } from './utils';
import { storeSearchableMovie, deleteObject } from './internals/algolia';
import { centralOrgID, algolia } from './environments/environment';

/** Function triggered when a document is added into movies collection. */
export async function onMovieCreate(
  snap: FirebaseFirestore.DocumentSnapshot
) {
  const movie = snap.data() as MovieDocument;

  if (!movie) {
    console.error('Invalid movie data:', movie);
    throw new Error('movie update function got invalid movie data');
  }

  const user = await getDocument<PublicUser>(`users/${movie._meta!.createdBy}`);
  const organization = await getDocument<OrganizationDocument>(`orgs/${user.orgId}`);

  // Update algolia's index
  return storeSearchableMovie(movie, organization.denomination.full);
}

/** Remove a movie and send notifications to all users of concerned organizations. */
export async function onMovieDelete(
  snap: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) {
  const movie = snap.data() as MovieDocument;

  /**
   *  When a movie is deleted, we also delete its sub-collections and references in other collections/documents.
   *  As we delete all deliveries linked to a movie, deliveries sub-collections and references will also be
   *  automatically deleted in the process.
   */

  const batch = db.batch();

  const organizations = await db.collection(`orgs`).get();
  // TODO: .where('movieIds', 'array-contains', movie.id) doesn't seem to work. => ISSUE#908

  organizations.forEach(async doc => {
    const organization = await getDocument<OrganizationDocument>(`orgs/${doc.id}`);

    if (organization.movieIds.includes(movie.id)) {
      console.log(`delete movie id reference in organization ${doc.data().id}`);
      batch.update(doc.ref, {
        movieIds: doc.data().movieIds.filter((movieId: string) => movieId !== movie.id)
      });
    }
  });

  // Delete sub-collections
  await removeAllSubcollections(snap, batch);

  // Update algolia's index
  await deleteObject(algolia.indexNameMovies, context.params.movieId);

  console.log(`removed sub colletions of ${movie.id}`);
  return batch.commit();
}

export async function onMovieUpdate(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>
): Promise<any> {
  const before = change.before.data() as MovieDocument;
  const after = change.after.data() as MovieDocument;

  const isMovieSubmitted = isSubmitted(before.main.storeConfig, after.main.storeConfig);
  const isMovieAccepted = isAccepted(before.main.storeConfig, after.main.storeConfig);

  if (isMovieSubmitted) { // When movie is submitted to Archipel Content
    const archipelContent = await getDocument<OrganizationDocument>(`orgs/${centralOrgID}`);
    const notifications = archipelContent.userIds.map(
      toUserId => createNotification({
        toUserId,
        type: 'movieSubmitted',
        docId: after.id
      })
    );

    return triggerNotifications(notifications);
  }

  if (isMovieAccepted) { // When Archipel Content accept the movie
    const organizations = await getOrganizationsOfMovie(after.id);
    const notifications = organizations
    .filter(organizationDocument => !!organizationDocument && !!organizationDocument.userIds)
    .reduce((ids: string[], { userIds }) => [...ids, ...userIds], [])
    .map(toUserId => {
      return createNotification({
        toUserId,
        type: 'movieAccepted',
        docId: after.id
      });
    });

    return triggerNotifications(notifications);
  }

  // insert orgName & orgID to the algolia movie index (this is needed in order to filter on the frontend)
  const creatorSnapshot = await db.doc(`users/${after._meta!.createdBy}`).get();
  const creator = creatorSnapshot.data() as PublicUser;
  const creatorOrgSnapshot = await db.doc(`orgs/${creator!.orgId}`).get();
  const creatorOrg = creatorOrgSnapshot.data() as PublicOrganization;

  if (creatorOrg.denomination?.full) {
    return storeSearchableMovie(after, creatorOrg.denomination.full);
  }
}

/** Checks if the store status is going from draft to submitted. */
function isSubmitted(beforeStore: StoreConfig | undefined, afterStore: StoreConfig | undefined) {
  return (
    (beforeStore && beforeStore.status === 'draft') &&
    (afterStore && afterStore.status === 'submitted')
  )
}

/** Checks if the store status is going from submitted to accepted. */
function isAccepted(beforeStore: StoreConfig | undefined, afterStore: StoreConfig | undefined) {
  return (
    (beforeStore && beforeStore.status === 'submitted') &&
    (afterStore && afterStore.status === 'accepted')
  )
}
