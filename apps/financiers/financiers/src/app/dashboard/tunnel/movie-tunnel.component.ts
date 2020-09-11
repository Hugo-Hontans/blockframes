// Angular
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

// Blockframes
import { MovieService, MovieQuery, Movie } from '@blockframes/movie/+state';
import { MovieForm } from '@blockframes/movie/form/movie.form';
import { TunnelRoot, TunnelConfirmComponent } from '@blockframes/ui/tunnel';
import { mergeDeep } from '@blockframes/utils/helpers';
import { MediaService } from '@blockframes/media/+state/media.service';
import { extractMediaFromDocumentBeforeUpdate } from '@blockframes/media/+state/media.model';

// Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// RxJs
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'financiers-movie-tunnel',
  templateUrl: './movie-tunnel.component.html',
  styleUrls: ['./movie-tunnel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieTunnelComponent implements TunnelRoot, OnInit {

  //////////////////////////////////////
  // EVERYTHING BELOW WILL BE REMOVED //
  //////////////////////////////////////

  // Have to be initialized in the constructor as children page use it in the constructor too
  public form = new MovieForm(this.query.getActive());

  public exitRoute: string;

  constructor(
    private service: MovieService,
    private query: MovieQuery,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private mediaService: MediaService,
  ) { }

  async ngOnInit() {
    this.exitRoute = `../../../title/${this.query.getActiveId()}`;
  }

  // Should save movie
  public async save() {
    if (this.form.invalid) {
      this.snackBar.open('It seems that one or more fields have an error. Please check your movie form and try again.', 'close', { duration: 5000 });
      return;
    }
    const movie: Movie = mergeDeep(this.query.getActive(), this.form.value);

    const { documentToUpdate, mediasToUpload } = extractMediaFromDocumentBeforeUpdate(this.form);

    await this.service.update(movie.id, documentToUpdate);
    this.mediaService.uploadOrDeleteMedia(mediasToUpload);

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