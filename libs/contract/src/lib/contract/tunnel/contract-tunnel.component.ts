import { Component, ChangeDetectionStrategy, Host, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService, Movie } from '@blockframes/movie';
import { TunnelStep, TunnelConfirmComponent } from '@blockframes/ui/tunnel'
import { ContractForm } from '../form/contract.form';
import { ContractQuery, ContractService, ContractType } from '../+state';
import { Observable, from, of } from 'rxjs';
import { startWith, map, switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

const steps = [{
  title: 'Step 1',
  icon: 'document',
  routes: [{
    path: 'details',
    label: 'contract Details'
  }]
}, {
  title: 'Summary',
  icon: '',
  routes: [{
    path: 'summary',
    label: 'Summary'
  }]
}]

/** Fill the steps depending on the movie */
function fillMovieSteps(movies: Movie[] = []): TunnelStep[] {
  if (!movies.length) {
    return steps
  }
  return [{
    ...steps[0]
  }, {
    title: 'Exploitation Rights',
    icon: 'world',
    routes: movies.map(movie => ({
      path: movie.id, label: movie.main.title.international
    }))
  }, {
    ...steps[1]
  }]
}

@Component({
  selector: 'contract-tunnel',
  templateUrl: './contract-tunnel.component.html',
  styleUrls: ['./contract-tunnel.component.scss'],
  providers: [ContractForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractTunnelComponent implements OnInit {
  public steps$: Observable<TunnelStep[]>;
  public type: ContractType;

  constructor(
    @Host() private form: ContractForm,
    private snackBar: MatSnackBar,
    private service: ContractService,
    private query: ContractQuery,
    private movieService: MovieService,
    private dialog: MatDialog,
  ) { }

  async ngOnInit() {
    const contract = this.query.getActive();
    this.type = contract.type;
    this.form.patchAllValue(contract);
  
    // Dynamic steps depending of the titles in the last contract version titles
    const titlesForm = this.form.get('versions').last().get('titles');
    this.steps$ = titlesForm.valueChanges.pipe(
      startWith(titlesForm.value),
      map(titles => Object.keys(titles)),
      switchMap(titleIds => this.movieService.getValue(titleIds)),
      map(movies => fillMovieSteps(movies))
    );
  }

  public save() {
    const id = this.query.getActiveId();
    const update = this.service.update({ id, ...this.form.value });
    // Return an observable<boolean> for the confirmExit
    return from(update).pipe(
      tap(_ => this.form.markAsPristine()),
      switchMap(_ => this.snackBar.open('Saved', '', { duration: 500 }).afterDismissed()),
      map(_ => true) 
    )
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
