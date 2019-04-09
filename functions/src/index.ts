// import * as gcs from '@google-cloud/storage';
import { hashToFirestore } from './generateHash';
import { onIpHash } from './ipHash';
import { auth, db, functions } from './firebase';
import { providers, utils } from 'ethers';
import { Relayer, relayerCreateLogic } from './relayer';

/**
 * Trigger: when eth-events-server pushes contract events.
 */
export const onIpHashEvent = functions.pubsub.topic('eth-events.ipHash').onPublish(onIpHash);

/**
 * Trigger: when user uploads document to firestore.
 *
 * NOTE: we will need to refactor the function to dispatch
 * depending on the file path. Or use different storage buckets
 * (one per app maybe).
 */
export const generateHash = functions.storage.object().onFinalize(hashToFirestore);

/**
 * Trigger: when user creates an account.
 *
 * We create a corresponding document in `users/userID`.
 */
export const onUserCreate = functions.auth.user().onCreate(user => {
  const { email, uid } = user;
  return db
    .collection('users')
    .doc(user.uid)
    .set({ email, uid });
});

/**
 * Trigger: REST call to find a list of users by email.
 */
export const findUserByMail = functions.https.onCall((data, context) => {
  const prefix: string = decodeURIComponent(data.prefix);

  // Leave if the prefix is too short (do not search every users in the universe).
  if (prefix.length < 2) {
    return [];
  }

  // String magic to figure out a prefixEnd
  // Say prefix is 'aaa'. We want to search all strings between 'aaa' (prefix) and 'aab' (prefixEnd)
  // this will match: 'aaa', 'aaaa', 'aaahello', 'aaazerty', etc.
  const incLast: string = String.fromCharCode(prefix.slice(-1).charCodeAt(0) + 1);
  const prefixEnd: string = prefix.slice(0, -1) + incLast;

  return db
    .collection('users')
    .where('email', '>=', prefix)
    .where('email', '<', prefixEnd)
    .get()
    .then(q => {
      // leave if there are too many results.
      if (q.size > 10) {
        return [];
      }

      return q.docs.map(d => ({ id: d.id, email: d.data().email }));
    });
});

/**
 * Trigger: REST call to find a list of orgs by name.
 */
export const findOrgByName = functions.https
  .onCall((data, context) => {
    const prefix: string = decodeURIComponent(data.prefix);

    // Leave if the prefix is too short (do not search every users in the universe).
    if (prefix.length < 2) {
      return [];
    }

    // String magic to figure out a prefixEnd
    // Say prefix is 'aaa'. We want to search all strings between 'aaa' (prefix) and 'aab' (prefixEnd)
    // this will match: 'aaa', 'aaaa', 'aaahello', 'aaazerty', etc.
    const incLast: string = String.fromCharCode(prefix.slice(-1).charCodeAt(0) + 1);
    const prefixEnd: string = prefix.slice(0, -1) + incLast;

    return db.collection('orgs')
      .where('name', '>=', prefix)
      .where('name', '<', prefixEnd)
      .get()
      .then(matchingOrgs => {
        // leave if there are too many results.
        if (matchingOrgs.size > 10) {
          return [];
        }

        return matchingOrgs.docs.map(matchingOrg => ({ id: matchingOrg.id, name: matchingOrg.data().name }));
      });
  });
/**
 * Trigger: REST call to get or create a user.
 */
export const getOrCreateUserByMail = functions.https.onCall(async (data, context) => {
  const { email } = data;

  try {
    const u = await auth.getUserByEmail(email);
    return { id: u.uid, email };
  } catch {
    const u = await auth.createUser({
      email,
      emailVerified: false,
      disabled: false
    });

    // TODO: trigger API to send a mail.

    return { id: u.uid, email };
  }
});

/**
 * Trigger: when signature (`orgId`) is added to or removed from `validated[]`
 */
export const onDeliveryUpdate = functions.firestore
  .document('deliveries/{deliveryID}')
  .onUpdate(async (change, context) => {
    if (!change.after || !change.before) {
      return true;
    }

    const delivery = change.after.data();
    const deliveryBefore = change.before.data();

    if (!delivery || !deliveryBefore) {
      return true;
    }

    const queryStakeholdersCount = await db
    .collection(`deliveries/${delivery.id}/stakeholders`)
    .get();
    const stakeholderCount = queryStakeholdersCount.docs.map(doc => doc.data());
    // when validated.length reaches stakeholderCount.length
    if (
      deliveryBefore.validated.length === (stakeholderCount.length - 1) &&
      delivery.validated.length === stakeholderCount.length
    ) {
      const queryMovie = await db
        .collection(`movies/${delivery.movieId}/materials`)
        .get();
      const materialsMovie = queryMovie.docs.map(doc => doc.data());

      const queryDelivery = await db
        .collection(`deliveries/${delivery.id}/materials`)
        .get();
      const materialsDelivery = queryDelivery.docs.map(doc => doc.data());

      const promises: Promise<any>[] = [];

      materialsDelivery.forEach(materialDelivery => {
        const materialExist = materialsMovie.find(materialMovie =>
          materialDelivery.value === materialMovie.value
          && materialDelivery.category === materialMovie.category
          && materialDelivery.description === materialMovie.description
        );

        if (materialExist) {
          // when material exists in movie, we update the existing material 'deliveriesIds' property
          materialExist.deliveriesIds.push(delivery.id);
          const promise = db
            .doc(`movies/${delivery.movieId}/materials/${materialExist.id}`)
            .set(materialExist);
          promises.push(promise);
        } else {
          // when material does not exist in movie, we make a copy of that material in the movie subcollection
          const promise = db
            .doc(`movies/${delivery.movieId}/materials/${materialDelivery.id}`)
            .set({ ...materialDelivery, deliveriesIds: [delivery.id] });
          promises.push(promise);
        }
      });
      await Promise.all(promises);
    }

    return true;
  });

//--------------------------------
//            RELAYER           //
//--------------------------------
// RUN THOSE COMMAND IN THE ROOT FOLDER
// 
// firebase functions:congig:set relayer.KEY=VALUE / set config
// firebase functions:config:get  / display current config
// firebase functions:config:get | ac ./functions/.runtimeconfig.json / export current config for local test (delete previous .runtimeconfig.json)
// firebase deploy --only functions:relayerCreate / deploy
// firebase functions:shell / start shell for local test
// relayerCreate.post().form({name: 'harrypotter', key: '0xbA2b47917c4ecE6d6Eb7606A54228Bf278614a00'}) / send request

// RELAYER INIT
let relayer: Relayer

export const relayerCreate = functions.https.onRequest(async (req, res) => {
  return relayerCreateLogic(req, res, relayer);
});

export const relayerSend = functions.https.onRequest((req, res) => {
  const receipt: providers.TransactionReceipt = {
    byzantium: false
  };
  return res.json({
    confirmations: 0,
    from: '0x0',
    wait: async () => receipt,
    nonce: 0,
    gasLimit: new utils.BigNumber(0),
    gasPrice: new utils.BigNumber(0),
    data: '0x0',
    value: new utils.BigNumber(0),
    chainId: 0
  });
});

export const relayerAddKey = functions.https.onRequest((req, res) => {
  const name = req.body.name;
  const key = req.body.key;
  if (!name || !key) return res.status(400).json({error: '"name" and "key" are mandatory parameters !'});
  return res.json({params: `${name}, ${key}`});
});

export const relayerRemoveKey = functions.https.onRequest((req, res) => {
  const name = req.body.name;
  const key = req.body.key;
  if (!name || !key) return res.status(400).json({error: '"name" and "key" are mandatory parameters !'});
  return res.json({params: `${name}, ${key}`});
});
