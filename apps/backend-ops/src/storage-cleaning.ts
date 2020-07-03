import { loadAdminServices } from './admin';
import { getStorageBucketName } from 'apps/backend-functions/src/internals/firebase';
import { File as GFile, Bucket } from '@google-cloud/storage';
import { MovieDocument } from 'apps/backend-functions/src/data/types';
import { getDocument } from 'apps/backend-functions/src/data/internals'

// @TODO (#3175) temp 
// gsutil -m rsync -r gs://blockframes.appspot.com gs://blockframes-bruce.appspot.com 

interface fileWithMovieDocument {
  file: GFile,
  movie: MovieDocument
}

export async function cleanStorage() {
  const { storage } = loadAdminServices();
  const bucket = storage.bucket(getStorageBucketName());

  const cleanMovieDirOutput = await cleanMovieDir(bucket);
  console.log(`Cleaned ${cleanMovieDirOutput.deleted}/${cleanMovieDirOutput.total} from "movie" directory.`)
  const cleanMoviesDirOutput = await cleanMoviesDir(bucket);
  console.log(`Cleaned ${cleanMoviesDirOutput.deleted}/${cleanMoviesDirOutput.total} from "movies" directory.`)
}

/**
 * Movie dir should not exists
 * @dev this should be usefull only once
 * @param bucket 
 */
async function cleanMovieDir(bucket: Bucket) {
  const files: GFile[] = (await bucket.getFiles({ prefix: 'movie/' }))[0];
  const filesToCheck: fileWithMovieDocument[] = [];
  let deleted = 0;

  for (const f of files) {
    const movieId = f.name.split('/')[1];
    // We check if the file is used before removing it
    const movie = await getDocument<MovieDocument>(`movies/${movieId}`);
    if (!!movie) {
      filesToCheck.push({ file: f, movie });
    } else {
      if (await smartDelete(f, files)) {
        deleted++;
      }
    }
  }

  deleted = deleted + (await checkMovieRef(filesToCheck));
  return { deleted, total: files.length };
}

async function cleanMoviesDir(bucket: Bucket) {
  // Movie dir should not exists
  const files: GFile[] = (await bucket.getFiles({ prefix: 'movies/' }))[0];
  const filesToCheck: fileWithMovieDocument[] = [];
  let deleted = 0;

  for (const f of files) {
    if (f.name.split('/').length === 2) {
      // Clean files at "movies/" root
      await smartDelete(f, files);
      deleted++;
    } else if (f.name.split('/').pop().length >= 255) {
      // Cleaning files that have a too long name
      if (await smartDelete(f, files)) {
        deleted++;
      }
    } else {
      const movieId = f.name.split('/')[1];
      const movie = await getDocument<MovieDocument>(`movies/${movieId}`);
      if (!!movie) {
        filesToCheck.push({ file: f, movie });
      } else {
        if (await smartDelete(f, files)) {
          deleted++;
        }
      }
    }
  }

  deleted = deleted + (await checkMovieRef(filesToCheck));
  return { deleted, total: files.length };
}

async function checkMovieRef(filesToCheck: fileWithMovieDocument[]) {
  // Currently, the only ref saved in DB is the orignal one
  const originalFiles = filesToCheck.filter(f => f.file.name.includes('/original/'));
  const otherFiles = filesToCheck.filter(f => !f.file.name.includes('/original/'));

  let deleted = 0;
  for (const f of originalFiles) {
    if (isImageForMovie(f.file.name)) {
      if (!findImgRefInMovie(f.movie, f.file.name)) {
        // We only delete original, functions will delete the rest
        if (await smartDelete(f.file, originalFiles.map(f => f.file))) {
          deleted++;
        }
      }
    }
  }

  for (const f of otherFiles) {
    if (isPdfForMovie(f.file.name)) {

      // Pdf files are currently stored here 
      const pdfUrl = f.file.name.includes('/PresentationDeck/') ? f.movie.promotionalElements.presentation_deck.media.urls.original : f.movie.promotionalElements.scenario.media.urls.original;
      const stringToFind = f.file.name.includes('/PresentationDeck/') ? `movie%2F${f.movie.id}%2FPresentationDeck` : `movie%2F${f.movie.id}%2FScenario`;

      if (!pdfUrl || !pdfUrl.includes(stringToFind)) {
        if (await smartDelete(f.file, originalFiles.map(f => f.file))) {
          deleted++;
        }
      }

    } else if (!isImageForMovie(f.file.name)) {
      console.log(f.file.name)
      console.log('!!!!!!!!!!!!!!!!! should not occur remove isPdfForMovie')
    }

  }
  return deleted;
}

function isImageForMovie(fileName: string): boolean {

  return fileName.includes('/promotionalElements.banner') ||
    fileName.includes('/promotionalElements.poster') ||
    fileName.includes('/promotionalElements.still_photo')
}

function isPdfForMovie(fileName: string): boolean {
  // @TODO (#3175) files coming from "Files & likes" are stored in "movie" dir and not "movies" and don't have the good path
  return fileName.includes('/PresentationDeck/') || // @TODO (#3175) not a good path
    fileName.includes('/Scenario/') // @TODO (#3175) not a good path
}

async function smartDelete(file: GFile, existingFiles: GFile[]) {
  if (!file.name.includes('/promotionalElements.')) {
    await file.delete();
    return true;
  }


  // We only delete original since the function will take care of the other sizes
  if (file.name.includes('/original/')) {
    await file.delete();
    return true;
  }

  // we check if the original exists
  const fileParts = file.name.split('/');
  const ressourcesPath = file.name.replace(`${fileParts[fileParts.length - 2]}/${fileParts[fileParts.length - 1]}`, '');
  const originalDirPath = `${ressourcesPath}original`;

  if (!existingFiles.some(f => f.name.includes(originalDirPath))) {
    await file.delete();
    return true;
  }

  return false;
}


function findImgRefInMovie(movie: MovieDocument, ref: string) {
  if (movie.promotionalElements.banner.media.ref === ref) {
    return true;
  }

  if (movie.promotionalElements.poster.some(p => p.media.ref === ref)) {
    return true;
  }

  if (movie.promotionalElements.still_photo.some(p => p.media.ref === ref)) {
    return true;
  }

  return false;
}