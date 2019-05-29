import { db, functions } from './firebase';
import { triggerNotifications, prepareNotification } from './notify';
import {
  Organization,
  getDocument,
  getOrgsOfDelivery,
  getCollection,
  Stakeholder,
  Movie,
  Material,
  getCount,
  Delivery
} from './utils';

export async function onDeliveryUpdate(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
) {
  if (!change.after || !change.before) {
    return true;
  }

  const [deliveryDoc, deliveryDocBefore] = [change.after.data(), change.before.data()];

  if (!deliveryDoc || !deliveryDocBefore) {
    return true;
  }

  /**
   * Note: Google Cloud Function enforces "at least once" delivery for events.
   * This means that an event may processed twice by this function, with the same Before and After data.
   * We store the Google Cloud Funtion's event ID in the delivery, retrieve it and verify that its different
   * betweeen two runs to enforce "only once delivery".
   */
  const delivery = await getDocument<Delivery>(`deliveries/${deliveryDoc.id}`);
  const processedId = delivery.processedId;

  const [orgs, movie, stakeholderCount] = await Promise.all([
    getOrgsOfDelivery(delivery.id),
    getDocument<Movie>(`movies/${delivery.movieId}`),
    getCount(`deliveries/${delivery.id}/stakeholders`)
  ]);

  const isNewSignature = deliveryDoc.validated.length === deliveryDocBefore.validated.length + 1;
  const isFullSignatures = deliveryDoc.validated.length === stakeholderCount;
  const isBeforeStateClean = deliveryDocBefore.validated.length === stakeholderCount - 1;

  if (isNewSignature && !isFullSignatures) {
    await notifyOnNewSignee(delivery, orgs, movie);
  }

  if (!isBeforeStateClean || !isFullSignatures) {
    return true;
  }

  if (processedId === context.eventId) {
    return true;
  }

  // When validated.length reaches stakeholderCount.length
  try {
    await db.doc(`deliveries/${delivery.id}`).update({ processedId: context.eventId });
    const [materialsMovie, materialsDelivery] = await Promise.all([
      getCollection<Material>(`movies/${delivery.movieId}/materials`),
      getCollection<Material>(`deliveries/${delivery.id}/materials`)
    ]);

    const promises = copyMaterialsToMovie(materialsDelivery, materialsMovie, delivery);
    // When delivery is signed, we create notifications for each stakeholder
    const notifications = createNotifications(orgs, movie, delivery);

    promises.push(triggerNotifications(notifications));
    await Promise.all(promises);
  } catch (e) {
    await db.doc(`deliveries/${delivery.id}`).update({ processedId: null });
    throw e;
  }
  return true;
}

/**
 * Copy each delivery Material into the movie materials sub-collection. This checks if the copied Material
 * already exists in the movie before copying it. If so, it just add the delivery.id into material.deliveriesIds.
 */
function copyMaterialsToMovie(
  deliveryMaterials: Material[],
  movieMaterials: Material[],
  delivery: Delivery
) {
  return deliveryMaterials.map(deliveryMaterial => {
    const duplicateMaterial = movieMaterials.find(
      materialMovie =>
        deliveryMaterial.value === materialMovie.value &&
        deliveryMaterial.category === materialMovie.category &&
        deliveryMaterial.description === materialMovie.description
    );

    if (!!duplicateMaterial) {
      // Check if delivery.id is already in material.deliveriesIds before pushing it in.
      if (!duplicateMaterial.deliveriesIds.includes(delivery.id)) {
        duplicateMaterial.deliveriesIds.push(delivery.id);
      }

      const updatedMaterial = {
        ...duplicateMaterial,
        state: !!duplicateMaterial.state ? duplicateMaterial.state : 'pending'
      };

      return db
        .doc(`movies/${delivery.movieId}/materials/${updatedMaterial.id}`)
        .set(updatedMaterial);
    }
    const material = { ...deliveryMaterial, deliveriesIds: [delivery.id], state: 'pending' };
    return db.doc(`movies/${delivery.movieId}/materials/${material.id}`).set(material);
  });
}

/**
 * Notifications are triggered when a new id is pushed into delivery.validated, which is considered as a signature
 * Note: It doesn't trigger if this is the last signature, as another notification will be sent to notify
 * that all stakeholders approved the delivery.
 */
async function notifyOnNewSignee(delivery: any, orgs: Organization[], movie: Movie): Promise<void> {
  const newStakeholderId = delivery.validated[delivery.validated.length - 1];
  const newStakeholder = await getDocument<Stakeholder>(
    `deliveries/${delivery.id}/stakeholders/${newStakeholderId}`
  );

  if (!newStakeholder) {
    throw new Error(`This stakeholder doesn't exist !`);
  }

  const newStakeholderOrg = await getDocument<Organization>(`orgs/${newStakeholder!.orgId}`);

  if (!newStakeholderOrg) {
    throw new Error(`This organization doesn't exist !`);
  }

  const notifications = createNotifications(orgs, movie, delivery, newStakeholderOrg);

  await triggerNotifications(notifications);
}

/**
 * Create custom notifications for deliveries signatures. If it is used for a non-final signature,
 * pass the signatory's Organization as the 4th argument to get the correct message displayed in notification.
 */
function createNotifications(
  orgs: Organization[],
  movie: Movie,
  delivery: Delivery,
  newStakeholderOrg?: Organization
) {
  return orgs
    .filter(org => !!org && !!org.userIds)
    .reduce((ids: string[], { userIds }) => [...ids, ...userIds], [])
    .map((userId: string) => {
      let customMessage: string;
      if (!!newStakeholderOrg) {
        customMessage = `${newStakeholderOrg.name} just signed ${movie.title.original}'s delivery`;
      } else {
        customMessage = `${movie.title.original}'s delivery has been approved by all stakeholders.`;
      }
      return prepareNotification({
        message : customMessage,
        userId,
        path: `/layout/${delivery.movieId}/${delivery.id}/view`,
        docID: { id: delivery.id, type: 'delivery' }
      });
    });
}
