import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MovieFormShellComponent } from '../shell/shell.component';
import { Observable } from 'rxjs';
import { staticConsts, UnitBox } from '@blockframes/utils/static-model';
import { startWith, map } from 'rxjs/operators';
import { staticModels } from '@blockframes/utils/static-model';

function toUnit(unit: UnitBox) {
  switch (unit) {
    case 'boxoffice_dollar': return '$'
    case 'boxoffice_euro': return '€'
    case 'admissions': return 'admissions'
  }
}
type Unit = ReturnType<typeof toUnit>;

@Component({
  selector: 'movie-form-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieFormAdditionalInformationComponent implements OnInit {
  form = this.shell.form;
  unitBox = staticConsts.unitBox;
  units$: Observable<Unit[]>;
  certifications = staticModels.CERTIFICATIONS.filter(cert =>
    (cert.slug !== 'awarded-film' && cert.slug !== 'a-list-cast'));

  public releaseColumns = {
    country: "Country",
    media: 'Release Media Name',
    date: 'Date',
  }

  public boxOfficeColumns = {
    territory: "Country",
    unit: 'Metrics',
    value: 'Figures'
  }

  public ratingColumns = {
    value: "Rating",
    country: 'Country',
  }

  public qualificationsColumns = {
    certifications: "Qualifications",
  }

  constructor(private shell: MovieFormShellComponent) { }

  ngOnInit() {
    this.units$ = this.form.boxOffice.valueChanges.pipe(
      startWith(this.form.boxOffice.value),
      map((boxOffices) => boxOffices.map(({ unit }) => toUnit(unit)))
    );
  }

  get qualifications() {
    return this.form.get('certifications');
  }

  get rating() {
    return this.form.get('rating');
  }

  get originalRelease() {
    return this.form.get('originalRelease');
  }

  get boxOffice() {
    return this.form.get('boxOffice');
  }
}