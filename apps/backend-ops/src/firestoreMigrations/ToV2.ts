import { Firestore } from '../admin';
import { pickBy, identity } from 'lodash';


const withoutUndefined = x => pickBy(x, identity);

/**
 * Lets you select values from an item while configuring default values.
 *
 * Select all the keys from defaultValues in item,
 * if a value is undefined, uses the default Value.
 *
 * selectAndMergeValues({a: undefined, b: 2, c: true}, {a: 42, c: false}) => {a: 42, c: true}
 */
const selectAndMergeValues = (item, defaultValues) => {
  const result = { ...defaultValues };

  Object.keys(defaultValues).forEach(key => {
    if (item[key] !== undefined) {
      result[key] = item[key];
    }
  });

  return result;
};

/**
 * Migration for invitation document
 * from organizationId to organization object
 */
export async function updateOrganizationIntoInvitation(db: Firestore) {
  const invitations = await db.collection('invitations').get();

  const invitationWithOrgName = invitations.docs.map( async (invitDocSnapshot: any): Promise<any> => {
    const invitationData = invitDocSnapshot.data();
    const {organizationId} = invitationData;

    const org = await db.doc(`orgs/${organizationId}`).get();
    const orgName = org.data().name;

    delete invitationData.organizationId;

    const newData = {...invitationData, organization: {id: organizationId, name: orgName}}
    return invitDocSnapshot.ref.set(newData);
  });
  const results = await Promise.all(invitationWithOrgName);
  console.log('Updating organisation in invitation collection done');
}

/**
 * Update organisation document from AFM information to today master information (18/11/19)
 */
export async function updateOrganizationDocument(db: Firestore) {
  const organizations = await db.collection('orgs').get();

  const newOrgnizationData = organizations.docs.map(async (orgDocSnapshot: any): Promise<any> => {
    const orgData = orgDocSnapshot.data();
    const {address, phoneNumber} = orgData;

    delete orgData.address;
    delete orgData.catalog;
    delete orgData.officeAddress;
    delete orgData.phoneNumber;

    const newData = {
      ...orgData,
      addresses: {
        city: address,
        country: "",
        phoneNumber: phoneNumber,
        region: "",
        street: "",
        zipCode: ""
    }};
    return orgDocSnapshot.ref.set(newData);
  });
  const results = await Promise.all(newOrgnizationData);
  console.log('Updating organization documents done');
}
