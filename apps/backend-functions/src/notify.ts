import { db, serverTimestamp } from './firebase';
import { DocID, SnapObject, APP_DELIVERY_ICON, APP_MOVIE_ICON } from './utils';

interface BaseNotification {
  message: string;
  userId: string;
  docID: DocID;
  stakeholderId?: string;
  path?: string;
}

interface Notification extends BaseNotification {
  id: string;
  isRead: boolean;
  date: any;
  app: string;
}

/** Takes one or more notifications and add them on the notifications collection */
export async function triggerNotifications(notifications: Notification[]): Promise<any> {
  const notificationBatch = db.batch();

  notifications.forEach(notification => {
    const notificationRef = db.collection('notifications').doc(notification.id);
    notificationBatch.set(notificationRef, notification);
  });

  return notificationBatch.commit();
}

/** Takes a BaseNotification (message, userId...), and adds Notification fields to return a real Notification */
export function prepareNotification(notif: BaseNotification): Notification {
  return {
    id: db.collection('notifications').doc().id,
    isRead: false,
    date: serverTimestamp(),
    app: notif.docID.type === 'delivery' ? APP_DELIVERY_ICON : APP_MOVIE_ICON,
    ...notif
  } as Notification;
}

/** Create a custom message base on what is inside the SnapObject (mostly docID.type, userId, and count) */
export function customMessage(userId: string, snap: SnapObject) {
  if (snap.docID.type === 'delivery') {
    return snap.org.userIds.includes(userId) && snap.count > 1
      ? `You have been invited to participate in ${snap.movieTitle}'s ${snap.docID.type}. Do you wish to work on it ?`
      : `${snap.org.name} has been added to ${snap.movieTitle}'s ${snap.docID.type}`;
    }
  if (snap.docID.type === 'movie') {
    return snap.org.userIds.includes(userId) && snap.count > 1
      ? `You have been invited to participate in ${snap.movieTitle}. Do you wish to work on it ?`
      : `${snap.org.name} has been added to ${snap.movieTitle}`;
  } else {
    throw new Error('Message is not valid');
  }
}
