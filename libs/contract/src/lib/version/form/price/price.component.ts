import { map, pluck } from 'rxjs/operators';
// Blockframes
import { ContractTunnelComponent } from '@blockframes/contract/contract/tunnel/contract-tunnel.component';
import { ContractVersionForm } from '@blockframes/contract/version/form/version.form';
import { Movie } from '@blockframes/movie/movie/+state/movie.model';
import { FormStaticValue, FormList } from '@blockframes/utils/form';
import { MoviesIndex, } from '@blockframes/utils/algolia';

// Angular
import { FormControl } from '@angular/forms';
import { Component, Input, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

// RxJs & Algolia & etc
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Index } from 'algoliasearch';

@Component({
  selector: '[form] contract-version-form-price',
  templateUrl: 'price.component.html',
  styleUrls: ['price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceComponent implements OnInit {
  @Input() form: FormList<any, ContractVersionForm>;
  public _hasMandate: boolean;
  @Input()
  get hasMandate() { return this._hasMandate; }
  set hasMandate(value: boolean) {
    this._hasMandate = coerceBooleanProperty(value);
  }

  public movieCtrl = new FormControl();

  public currencyCtrl: FormStaticValue<'MOVIE_CURRENCIES'>;

  /* Observable of all movies */
  public movieSearchResults$: Observable<Movie[]>;

  public movies$: Observable<Movie[]>;

  constructor(
    @Inject(MoviesIndex) private movieIndex: Index,
    private tunnel: ContractTunnelComponent) { }

  ngOnInit() {
    this.movies$ = this.tunnel.movies$.pipe(
      distinctUntilChanged((a, b) => a.length === b.length));
    this.currencyCtrl = this.form.last().get('price').get('currency');
    this.movieSearchResults$ = this.movieCtrl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(text => this.movieIndex.search(text)),
      pluck('hits')
    )
  }

  /**
   * @description returns the movie ids which are currently active on the form
   */
  get activeMovieIds(): string[] {
    return Object.keys(this.form.last().get('titles').controls)
  }

  /**
   * @description checks if package price is equal or above all the title price
   */
  get totalPrice$(): Observable<boolean> {
    let accumilatedPrice = 0;
    const state = new BehaviorSubject(false)
    for (const id of this.activeMovieIds) {
      const version = this.form.last().value;
      accumilatedPrice += version.titles[id].price.amount;
    }
    accumilatedPrice > this.totalAmount.value ? state.next(true) : state.next(false)
    return state
  }

  /**
   * @description gets the control for the total amount of the package
   */
  get totalAmount() {
    return this.form.last().get('price').get('amount');
  }

  /**
   * @description gets the price form group back for the parameter
   * @param movieId 
   */
  public priceForm(movieId: string) {
    return this.form.last().get('titles').get(movieId).get('price');
  }

  public selectMovie(movieId: string) {
    return this.movies$.pipe(map(movies => movies.find(movie => movie.id === movieId)))
  }

  /**
   * @description gets the control for the commision amount of the package
   */
  get commissionFee() {
    return this.form.last().get('price').get('commission');
  }

  /**
   * @description helper function
   * @param movieId movie to remove in the form
   */
  public removeTitle(movieId: string) {
    this.tunnel.removeTitle(movieId);
  }

  /**
   * @description gets triggered when the user choosed a movie from the dropdown
   * @param event 
   */
  public addMovie(event: MatAutocompleteSelectedEvent) {
    this.tunnel.addTitle(event.option.value.objectID, this._hasMandate)
    this.movieCtrl.reset();
  }
}
