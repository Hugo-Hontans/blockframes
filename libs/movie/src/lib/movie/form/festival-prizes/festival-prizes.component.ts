import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MovieFestivalPrizesForm } from './festival-prizes.form';


@Component({
  selector: '[formGroup] movie-form-festivalprizes, [formGroupName] movie-form-festivalprizes',
  templateUrl: './festival-prizes.component.html',
  styleUrls: ['./festival-prizes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieFormFestivalPrizesComponent {
  
  constructor(public controlContainer: ControlContainer) { }

  get festivalprizes() : MovieFestivalPrizesForm {
    return this.controlContainer.control as MovieFestivalPrizesForm;
  }

  public getPrizeName(i) {
    const control = this.festivalprizes.getPrize(i);
    return control.get('name').value ? control.get('name').value : 'unnamed festival';
  }

  public getPrizeLogo(i) {
    const control = this.festivalprizes.getPrize(i);
    return control.get('logo').value;
  }
}
