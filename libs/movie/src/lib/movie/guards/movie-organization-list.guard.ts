import { Injectable } from '@angular/core';
import { CollectionGuard } from 'akita-ng-fire';
import { map } from 'rxjs/operators';
import { MovieState, MovieService, MovieQuery } from '../+state';

@Injectable({ providedIn: 'root' })
export class MovieOrganizationListGuard extends CollectionGuard<MovieState> {
  constructor(protected service: MovieService, private query: MovieQuery) {
    super(service);
  }

  get awaitSync() {
    return this.query.getCount() === 0;
  }

  sync() {
    return this.service.syncOrgMovies().pipe(
      map(_ => this.query.getCount()),
      map(count => (count === 0 ? 'layout/o/home/create' : true))
    );
  }
}
