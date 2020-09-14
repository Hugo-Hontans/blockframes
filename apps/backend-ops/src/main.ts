import 'tsconfig-paths/register';
import { config } from 'dotenv';
config(); // * Must be run here!
import { warnMissingVars } from '@blockframes/firebase-utils';
warnMissingVars()

import { prepareForTesting, restoreShortcut, upgrade, prepareDb, prepareStorage } from './firebaseSetup';
import { migrate } from './migrations';
import { showHelp } from './tools';
import { upgradeAlgoliaMovies, upgradeAlgoliaOrgs, upgradeAlgoliaUsers } from './algolia';
import { clearUsers, createUsers, printUsers, generateWatermarks, syncUsers } from './users';
import { generateFixtures } from './generate-fixtures';

const args = process.argv.slice(2);
const [cmd, ...rest] = args;

async function runCommand() {
  if (cmd === 'prepareForTesting') {
    return prepareForTesting();
  } else if (cmd === 'prepareDb') {
    return prepareDb();
  } else if (cmd === 'prepareStorage') {
    return prepareStorage();
  } else if (cmd === 'generateFixtures') {
    return generateFixtures();
  } else if (cmd === 'upgrade') {
    return upgrade();
  } else if (cmd === 'restore') {
    return restoreShortcut();
  } else if (cmd === 'migrate') {
    return migrate();
  } else if (cmd === 'syncUsers') {
    return syncUsers();
  } else if (cmd === 'printUsers') {
    return printUsers();
  } else if (cmd === 'clearUsers') {
    return clearUsers();
  } else if (cmd === 'createUsers') {
    return createUsers();
  } else if (cmd === 'generateWatermarks') {
    return generateWatermarks();
  } else if (cmd === 'upgradeAlgoliaOrgs') {
    return upgradeAlgoliaOrgs();
  } else if (cmd === 'upgradeAlgoliaMovies') {
    return upgradeAlgoliaMovies();
  } else if (cmd === 'upgradeAlgoliaUsers') {
    return upgradeAlgoliaUsers();
  } else {
    showHelp();
    return Promise.reject('Command not recognised');
  }
}

const consoleMsg = `Time running command "${cmd}"`;
console.time(consoleMsg);
runCommand()
  .then(() => {
    console.timeEnd(consoleMsg);
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    console.timeEnd(consoleMsg);
    process.exit(1);
  });
