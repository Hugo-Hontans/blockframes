import { randomString, randomEmail } from './functions';

export interface User {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export interface Organization {
  address: string;
  phoneNumber: string;
}

export function createUser(): User {
  return {
    email: randomEmail(),
    password: randomString(),
    name: randomString(),
    surname: randomString()
  };
}

export function createOrganization(): Organization {
  return { address: randomString(), phoneNumber: randomString() };
}
