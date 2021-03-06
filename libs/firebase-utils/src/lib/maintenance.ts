import * as admin from 'firebase-admin';

type Timestamp = admin.firestore.Timestamp;

const EIGHT_MINUTES_IN_MS = 8 * 60 * 1000;

interface IMaintenanceDoc {
  startedAt: Timestamp | null;
  endedAt: Timestamp | null;
}

export const META_COLLECTION_NAME = '_META';

const maintenanceRef = () => {
  const db = admin.firestore();
  return db.collection(META_COLLECTION_NAME).doc('_MAINTENANCE');
};

export async function startMaintenance() {
  if (process.env.BLOCKFRAMES_MAINTENANCE_DISABLED) {
    console.warn('Warning: startMaintenance() called but BLOCKFRAMES_MAINTENANCE_DISABLED is set to true. Maintenance mode is disabled...');
    return;
  }
  return maintenanceRef().set({ startedAt: admin.firestore.FieldValue.serverTimestamp(), endedAt: null });
}

export async function endMaintenance() {
  if (process.env.BLOCKFRAMES_MAINTENANCE_DISABLED) return;
  return maintenanceRef().set({
    endedAt: admin.firestore.FieldValue.serverTimestamp(),
    startedAt: null
  });
}

/**
 * 
 * @param delay 8 min by default. This delay is a security to
 * be sure that every process is stopped before continuing
 */
export async function isInMaintenance(delay = EIGHT_MINUTES_IN_MS) {
  const ref = maintenanceRef();
  const doc = await ref.get();

  // we've never seen any maintenance
  if (!doc.exists) {
    return false;
  }

  const { startedAt, endedAt } = doc.data() as IMaintenanceDoc;
  const now = admin.firestore.Timestamp.now();

  if (endedAt) {
    return endedAt.toMillis() + delay > now.toMillis();
  }

  if (startedAt) {
    return true;
  }

  throw new Error(
    'Unexpected cases for maintenance check! please check the _META/_MAINTENANCE document.'
  );
}

// TODO: take the time to fix the types,
// probably turn this into a generic (f: T) to and preserve types.
export const skipInMaintenance = (f: any) => {
  // return a new function that is:
  // the old function + a check that early exits when we are restoring.
  return async (...args: any[]) => {
    // early exit
    if (await isInMaintenance()) {
      return true;
    }

    return f(...args);
  };
};
