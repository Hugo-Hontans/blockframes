import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProfileForm } from '@blockframes/account/profile/forms/profile-edit.form';
@Component({
  selector: '[formGroupName] profile-form, [formGroup] profile-form, [form] profile-form',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent {

  @Input() form: ProfileForm;
}
