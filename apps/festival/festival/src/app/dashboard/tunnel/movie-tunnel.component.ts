// Angular
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
// Blockframes
import { MovieService, MovieQuery, Movie, PromotionalElement } from '@blockframes/movie/+state';
import { MovieForm } from '@blockframes/movie/form/movie.form';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TunnelStep, TunnelRoot, TunnelConfirmComponent } from '@blockframes/ui/tunnel';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { mergeDeep } from '@blockframes/utils/helpers';
import { MoviePromotionalElementsForm } from '@blockframes/movie/form/promotional-elements/promotional-elements.form';
import { MediaService } from '@blockframes/utils/media/media.service';

const steps: TunnelStep[] = [{
  title: 'Title Information',
  icon: 'document',
  time: 15,
  routes: [{
    path: 'main',
    label: 'Main Information'
  }, {
    path: 'synopsis',
    label: 'Storyline Elements'
  }, {
    path: 'credits',
    label: 'Credits'
  }, {
    path: 'budget',
    label: 'Budget, Quotas, Critics',
  }]
}, {
  title: 'Media',
  icon: 'import',
  time: 10,
  routes: [{
    path: 'technical-info',
    label: 'Technical Information'
  }, {
    path: 'images',
    label: 'Promotional Images'
  }, {
    path: 'files&links',
    label: 'Files & Links'
  }]
}, {
  title: 'Summary',
  icon: 'document',
  routes: [{
    path: 'summary',
    label: 'Summary & Submission'
  }]
}];

@Component({
  selector: 'festival-movie-tunnel',
  templateUrl: './movie-tunnel.component.html',
  styleUrls: ['./movie-tunnel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieTunnelComponent implements TunnelRoot, OnInit {
  steps = steps;
  // Have to be initialized in the constructor as children page use it in the constructor too
  public form = new MovieForm(this.query.getActive());

  public exitRoute: string;

  constructor(
    private service: MovieService,
    private query: MovieQuery,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private media: MediaService
  ) { }

  async ngOnInit() {
    this.exitRoute = `../../../title/${this.query.getActiveId()}`;
  }

  // Should save movie
  public async save() {

    const [ value, media ] = extractMedia(this.form.value);
    this.media.uploadOrDeleteMedia(media);

    const movie: Movie = mergeDeep(this.query.getActive(), value);
    console.log('saving movie: ', movie);
    // await this.service.update(movie);
    this.form.markAsPristine();
    await this.snackBar.open('Title saved', '', { duration: 500 }).afterDismissed().toPromise();
    return true;
  }

  confirmExit() {
    if (this.form.pristine) {
      return of(true);
    }
    const dialogRef = this.dialog.open(TunnelConfirmComponent, {
      width: '80%',
      data: {
        title: 'You are going to leave the Movie Form.',
        subtitle: 'Pay attention, if you leave now your changes will not be saved.'
      }
    });
    return dialogRef.afterClosed().pipe(
      switchMap(shouldSave => shouldSave ? this.save() : of(false))
    );
  }

}

function extractMedia(origin: any) {
  const value = Object.assign({}, origin);
  const media = extractMediaValue(value);
  return [ value, media ];
}

function extractMediaValue(value) {
  let media = [];
   for (const key in value) {
    if (key === 'media') {
      if (!!value[key]) {
        media.push(value[key]);
      }
      delete value[key];
    } else if (typeof value[key] === 'object' && !!value[key]) {
      const childMedia = extractMediaValue(value[key]);
      media = media.concat(childMedia);
    }
  }
  return media;
}
