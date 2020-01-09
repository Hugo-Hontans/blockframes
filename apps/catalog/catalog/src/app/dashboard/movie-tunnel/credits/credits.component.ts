import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MovieForm } from '@blockframes/movie/movie/form/movie.form';

@Component({
  selector: 'catalog-movie-tunnel-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditsComponent implements OnInit {

  constructor(private form: MovieForm) { }

  get productionYear() {
    return this.form.get('main').get('productionYear');
  }

  get productionCompanies() {
    return this.form.get('main').get('productionCompanies');
  }

  get salesCast() {
    return this.form.get('salesCast');
  }

  get credits() {
    return this.salesCast.get('credits');
  }


  ngOnInit() {
  }

}
