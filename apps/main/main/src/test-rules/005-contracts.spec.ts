import { setup, teardown } from './helpers.spec';
import {
  contractAznavour,
  mockData,
  userGilles,
  userMax,
  userTom,
  userVincentBlockframesAdmin
} from './mock';

describe('Contracts rules', () => {
  afterAll(async () => {
    await teardown();
  });

  test('deny a user not logged to access a contract', async () => {
    const db = await setup(undefined, mockData);
    const orgRef = db.doc(`contracts/${contractAznavour.id}`);
    await expect(orgRef.get()).toDeny();
  });

  test('deny a user not member of the contract to access it', async () => {
    const db = await setup(userTom, mockData);
    const orgRef = db.doc(`contracts/${contractAznavour.id}`);
    await expect(orgRef.get()).toDeny();
    await expect(orgRef.update({ updated: true })).toDeny();
    await expect(orgRef.set({ set: true })).toDeny();
    await expect(orgRef.delete()).toDeny();
  });

  test('allow a user member with CRUD access on the contract to access it', async () => {
    const db = await setup(userGilles, mockData);
    const orgRef = db.doc(`contracts/${contractAznavour.id}`);

    await expect(orgRef.get()).toAllow();
    await expect(orgRef.update({ updated: true })).toAllow();
    await expect(orgRef.set({ set: true })).toAllow();
    await expect(orgRef.delete()).toAllow();
  });

  test('allow a user member with R access on the contract to read it ONLY', async () => {
    const db = await setup(userMax, mockData);
    const orgRef = db.doc(`contracts/${contractAznavour.id}`);
    await expect(orgRef.get()).toAllow();
    await expect(orgRef.update({ updated: true })).toDeny();
    await expect(orgRef.set({ set: true })).toDeny();
    await expect(orgRef.delete()).toDeny();
  });

  test('allow an admin to access the contract', async () => {
    const db = await setup(userVincentBlockframesAdmin, mockData);
    const orgRef = db.doc(`contracts/${contractAznavour.id}`);
    await expect(orgRef.get()).toAllow();
    await expect(orgRef.update({ updated: true })).toAllow();
    await expect(orgRef.set({ set: true })).toAllow();
    await expect(orgRef.delete()).toAllow();
  });
});