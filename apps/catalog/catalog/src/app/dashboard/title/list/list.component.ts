import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Movie, MovieQuery, MovieService, getMovieReceipt } from '@blockframes/movie';
import { startWith, switchMap, map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Contract } from '@blockframes/contract/contract/+state/contract.model';
import { StoreStatus, MovieAnalytics } from '@blockframes/movie/movie+state/movie.firestore';
import { ContractQuery } from '@blockframes/contract/contract/+state/contract.query';
import { getContractLastVersion } from '@blockframes/contract/version/+state';

interface TitleView {
  id: string;
  title: string;
  view: string;
  sales: number;
  receipt: string;
  status: StoreStatus;
}

const columns = {
  title: 'Title',
  view: '# View',
  sales: 'Sales',
  receipt: 'Total Gross Receipts',
  status: 'Status'
};

/**
 * Returns the number of views of a movie page.
 * @param analytics
 * @param movieId
 */
function getTotalViews(analytics: MovieAnalytics[], movieId: string): number {
  const movieAnalytic = analytics.find(analytic => analytic.movieId === movieId);
  const movieHits = movieAnalytic.movieViews.current.map(event => event.hits);
  return movieHits.reduce((acc, val) => acc + val, 0);
}

@Component({
  selector: 'catalog-title-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleListComponent implements OnInit {
  public columns = columns;
  public initialColumns = ['title', 'view', 'sales', 'receipt', 'status'];
  public titles$: Observable<TitleView[]>;

  public filter = new FormControl();
  public filter$ = this.filter.valueChanges.pipe(startWith(this.filter.value));

  public moviesAnalytics$ = this.service.getMovieAnalytics(
    this.query.getAll().map(movie => movie.id)
  );

  constructor(
    private query: MovieQuery,
    private contractQuery: ContractQuery,
    private service: MovieService
  ) {}

  ngOnInit() {
    // Filtered movies
    const movies$ = this.filter$.pipe(
      switchMap(filter =>
        this.query.selectAll({
          filterBy: movie => (filter ? movie.main.storeConfig.storeType === filter : true)
        })
      )
    );
    // Transform movies into a TitleView
    this.titles$ = combineLatest([
      movies$,
      this.contractQuery.selectAll(),
      this.moviesAnalytics$
    ]).pipe(
      map(([movies, contracts, analytics]) =>
        movies.map(movie => this.createTitleView(movie, contracts, analytics))
      )
    );
  }

  /** Dynamic filter of movies for each tab. */
  applyFilter(filter?: Movie['main']['storeConfig']['storeType']) {
    this.filter.setValue(filter);
  }

  /** Factory function to flatten movie data. */
  public createTitleView(movie: Movie, contracts: Contract[], analytics: MovieAnalytics[]): TitleView {
    const ownContracts = contracts.filter(c => getContractLastVersion(c).titles[movie.id]);
    return {
      id: movie.id,
      title: movie.main.title.international,
      view: getTotalViews(analytics, movie.id).toString(),
      sales: ownContracts.length,
      receipt: getMovieReceipt(ownContracts, movie.id),
      status: movie.main.storeConfig.status
    };
  }
}
