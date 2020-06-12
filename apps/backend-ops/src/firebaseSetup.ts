/**
 * Tooling to setup the firebase project before running tests.
 *
 * This module provides functions to trigger a firestore restore and test user creations.
 */
import { appUrlContent } from '@env';
import { syncUsers } from './users';
import { upgradeAlgoliaMovies, upgradeAlgoliaOrgs, upgradeAlgoliaUsers } from './algolia';
import { migrate } from './migrations';
import { restore } from './admin';
import { cleanDeprecatedData } from './data-cleaning';

export async function prepareForTesting() {
  console.info('Syncing users...');
  await syncUsers();
  console.info('Users synced!');

  console.info('Restoring backup...');
  await restore(appUrlContent);
  console.info('Backup restored!');

  console.info('Preparing the database...');
  await migrate(false); // run the migration, do not trigger a backup before, since we already have it!
  console.info('Database ready for testing!');

  // Cleaning process
  console.info('Cleaning unused data...')
  await cleanDeprecatedData();
  console.info('Data clean and fresh!')

  console.info('Preparing Algolia...');
  await upgradeAlgoliaOrgs();
  await upgradeAlgoliaMovies();
  await upgradeAlgoliaUsers();
  console.info('Algolia ready for testing!');

  process.exit(0);
}

export async function restoreShortcut() {
  return restore(appUrlContent);
}

export async function upgrade() {
  console.info('Preparing the database...');
  await migrate(true);
  console.info('Database ready for deploy!');

  console.info('Preparing Algolia...');
  await upgradeAlgoliaOrgs();
  await upgradeAlgoliaMovies();
  await upgradeAlgoliaUsers();
  console.info('Algolia ready for testing!');

  process.exit(0);
}

