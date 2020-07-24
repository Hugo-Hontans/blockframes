/**
 * Tooling to setup the firebase project before running tests.
 *
 * This module provides functions to trigger a firestore restore and test user creations.
 */
import { appUrl } from '@env';
import { syncUsers } from './users';
import { upgradeAlgoliaMovies, upgradeAlgoliaOrgs, upgradeAlgoliaUsers } from './algolia';
import { migrate } from './migrations';
import { restore } from './admin';
import { generateFixturesFile } from './anon-firestore';
import { startMaintenance, endMaintenance } from 'apps/backend-functions/src/maintenance';

export async function prepareForTesting() {
  console.info('Restoring backup...');
  await restore(appUrl.content, true);
  console.info('Backup restored!');

  await startMaintenance();
  console.info('Generating fixtures file...');
  await generateFixturesFile();
  console.info('fixtures file done!');

  console.info('Syncing users...');
  await syncUsers();
  console.info('Users synced!');
  await endMaintenance();

  console.info('Preparing the database...');
  await migrate(false); // run the migration, do not trigger a backup before, since we already have it!
  console.info('Database ready for testing!');

  // @todo(#3066) Reactivate Cleaning process when unit tested
  // console.info('Cleaning unused data...')
  // await cleanDeprecatedData();
  // console.info('Data clean and fresh!')

  console.info('Preparing Algolia...');
  await upgradeAlgoliaOrgs();
  await upgradeAlgoliaMovies();
  await upgradeAlgoliaUsers();
  console.info('Algolia ready for testing!');

  process.exit(0);
}

export async function restoreShortcut() {
  return restore(appUrl.content);
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
