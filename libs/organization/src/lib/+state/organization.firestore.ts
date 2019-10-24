/** Document model of an Organization */
export interface OrganizationDocument {
  id: string;
  name: string;
  address: string;
  officeAddress: string;
  email: string;
  created: number;
  updated: number;
  userIds: string[];
  movieIds: string[];
  templateIds: string[];
  status: OrganizationStatus;
  catalog: null;
  logo: string;
  phoneNumber: string;
  fiscalNumber: string;
  activity: string;
}

/** Status of an Organization, set to pending by default when an Organization is created. */
export const enum OrganizationStatus {
  pending = 'pending',
  accepted = 'accepted'
}

/** Default placeholder logo used when an Organization is created. */
export const PLACEHOLDER_LOGO = '/assets/logo/organisation_avatar_250.svg';

/** A public interface or Organization, without sensitive data. */
export interface PublicOrganization {
  id: string;
  name: string;
}

/** A factory function that creates an Organization. */
export function createOrganization(params: Partial<OrganizationDocument> = {}): OrganizationDocument {
  return {
    id: !!params.id ? params.id : '',
    name: '',
    email: '',
    fiscalNumber: '',
    activity: '',
    phoneNumber: '',
    address: '',
    officeAddress: '',
    status: OrganizationStatus.pending,
    userIds: [],
    movieIds: [],
    templateIds: [],
    created: Date.now(),
    updated: Date.now(),
    logo: '',
    catalog: null,
    ...params
  };
}
