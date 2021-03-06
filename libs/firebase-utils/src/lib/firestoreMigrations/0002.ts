import { Firestore } from '../types';


/**
 * Update organisation document from AFM information to today master information (18/11/19)
 */
export async function updateAdressesOrganizationDocument(db: Firestore) {
  const organizations = await db.collection('orgs').get();

  const newOrgnizationData = organizations.docs.map(async (orgDocSnapshot: any): Promise<any> => {
    const orgData = orgDocSnapshot.data();
    const {address, phoneNumber, created, updated} = orgData;

    delete orgData.address;
    delete orgData.catalog;
    delete orgData.officeAddress;
    delete orgData.phoneNumber;
    delete orgData.members;

    const newData = {
      ...orgData,
      addresses: {
        main : {
          city: address || '',
          country: '',
          phoneNumber: phoneNumber || '',
          street: '',
          zipCode: ''
        }
      },
      created: new Date(created),
      updated: new Date(updated)
    };

    return orgDocSnapshot.ref.set(newData);
  });
  await Promise.all(newOrgnizationData);
  console.log('Updating organization documents done.');
}

/**
 * Update poster url in movie documents.
 */
export async function updatePicturesMovieDocument(db: Firestore) {
  const movies = await db.collection('movies').get();

  const newMovieData = movies.docs.map(async (movieDocSnapshot: any): Promise<any> => {
    const movieData = movieDocSnapshot.data();

    const { poster } = movieData.main;
    const { logo } = movieData.salesAgentDeal.salesAgent;

    const newData = {
      ...movieData,
      festivalPrizes: {
        ...movieData.festivalPrizes,
        prizes: movieData.festivalPrizes.prizes.map(prizeData =>({
          ...prizeData,
          logo: {
            originalRef: '',
            ref: '',
            url: prizeData.logo
          }
        }))
      },
      main: {
        ...movieData.main,
        poster: {
          originalRef: '',
          ref: '',
          url: poster
        }
      },
      promotionalElements: {
        ...movieData.promotionalElements,
        promotionalElements: movieData.promotionalElements.promotionalElements.map(promoData => {
          const { url } = promoData;
          delete promoData.url;

          return {
            ...promoData,
            media: {
              originalRef: '',
              ref: '',
              url: url || ''
            }
          }
        })
      },
      salesAgentDeal: {
        ...movieData.salesAgentDeal,
        salesAgent: {
          ...movieData.salesAgentDeal.salesAgent,
          logo: {
            originalRef: '',
            ref: '',
            url: logo
          }
        }
      }
    };

    return movieDocSnapshot.ref.set(newData);
  });
  await Promise.all(newMovieData);
  console.log('Updating pictures in movie documents done.');
}

/**
 * Update user's avatar in user documents.
 */
export async function updateAvatarUserDocument(db: Firestore) {
  const users = await db.collection('users').get();

  const newUserData = users.docs.map(async (userDocSnapshot: any): Promise<any> => {
    const userData = userDocSnapshot.data();

    const { avatar } = userData;

    const newData = {
      ...userData,
      avatar: {
        originalRef: '',
        ref: avatar || '',
        url: ''
      }
    };

    return userDocSnapshot.ref.set(newData);
  });
  await Promise.all(newUserData);
  console.log('Updating avatar in user documents done.');
}

/**
 * Update organisation permissions data model.
 */
export async function updateOrganizationPermissionsModel(db: Firestore) {
  const permissions = await db.collection('permissions').get();
  const newPermissionsData = permissions.docs.map(async (permissionsSnap: any): Promise<any> => {
    const permissionsData = permissionsSnap.data();
    const updatedPermissionsData = {
      ...permissionsData,
      id: permissionsData.orgId,
      roles: {}
    }

    permissionsData.superAdmins.forEach((uid:string) => updatedPermissionsData.roles[uid] = 'superAdmin');
    permissionsData.admins.forEach((uid:string) => updatedPermissionsData.roles[uid] = 'superAdmin');

    delete updatedPermissionsData.superAdmins;
    delete updatedPermissionsData.admins;
    delete updatedPermissionsData.orgId;

    return permissionsSnap.ref.set(updatedPermissionsData);
  });

  await Promise.all(newPermissionsData);
  console.log('Organization permissions model updated.');
}

export async function upgrade(db: Firestore) {
  await updatePicturesMovieDocument(db);
  await updateAdressesOrganizationDocument(db);
  await updateOrganizationPermissionsModel(db);
}
