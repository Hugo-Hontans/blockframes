import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextFieldModule } from '@angular/cdk/text-field';

// Components
import { NewTemplateComponent } from './components/delivery-new-template/new-template.component';
import { StakeholderRepertoryComponent } from './components/stakeholder-repertory/stakeholder-repertory.component';
import { StakeholderItemComponent } from './components/stakeholder-item/stakeholder-item.component';
import { DeliveryTeamworkFormComponent } from './components/delivery-teamwork-form/delivery-teamwork-form.component';
import { DeliveryTeamworkItemComponent } from './components/delivery-teamwork-item/delivery-teamwork-item.component';
import { DeliveryTeamworkRepertoryComponent } from './components/delivery-teamwork-repertory/delivery-teamwork-repertory.component';
import { DeliverySignComponent } from './components/delivery-sign/delivery-sign.component';
import { DeliveryActionsComponent } from './components/delivery-actions/delivery-actions.component';
import { DeliveryRepertoryComponent } from './components/delivery-repertory/delivery-repertory.component';
import { DeliveryInformationsDatesDisplayComponent } from './components/delivery-informations-dates-display/delivery-informations-dates-display.component';
import { DeliveryInformationsDatesFormComponent } from './components/delivery-informations-dates-form/delivery-informations-dates-form.component';
import { DeliveryMaterialListComponent } from './components/delivery-material-list/delivery-material-list.component';
import { DeliveryMaterialFormComponent } from './components/delivery-material-form/delivery-material-form.component';
import { DeliveryInformationsStepsFormComponent } from './components/delivery-informations-steps-form/delivery-informations-steps-form.component';
import { DeliveryInformationsStepsRepertoryComponent } from './components/delivery-informations-steps-repertory/delivery-informations-steps-repertory.component';
import { DeliveryInformationsDeadlinesFormComponent } from './components/delivery-informations-deadlines-form/delivery-informations-deadlines-form.component';
import { DeliveryInformationsDeadlinesRepertoryComponent } from './components/delivery-informations-deadlines-repertory/delivery-informations-deadlines-repertory.component';
import { MovieMaterialListComponent } from './components/movie-material-list/movie-material-list.component';
import { MovieMaterialFormComponent } from './components/movie-material-form/movie-material-form.component';
import { DeliveryInformationsStakeholdersComponent } from './components/delivery-informations-stakeholders/delivery-informations-stakeholders.component';

import { DeliveryStatusesComponent } from './components/delivery-statuses/delivery-statuses.component';

// Pages
import { DeliveryListComponent } from './pages/delivery-list/delivery-list.component';
import { DeliveryEditableComponent } from './pages/delivery-editable/delivery-editable.component';
import { DeliveryTemplateListComponent } from './pages/delivery-template-list/delivery-template-list.component';
import { DeliveryTeamworkEditableComponent } from './pages/delivery-teamwork-editable/delivery-teamwork-editable.component';
import { DeliveryAddFindMovieComponent } from './pages/delivery-add-find-movie/delivery-add-find-movie.component';
import { DeliveryAddChooseStarterComponent } from './pages/delivery-add-choose-starter/delivery-add-choose-starter.component';
import { DeliveryAddTemplatePickerComponent } from './pages/delivery-add-template-picker/delivery-add-template-picker.component';
import { DeliveryAddSettingsComponent } from './pages/delivery-add-settings/delivery-add-settings.component';
import { DeliveryInformationsEditableComponent } from './pages/delivery-informations-editable/delivery-informations-editable.component';
import { DeliveryAddSpecificDeliveryListPickerComponent } from './pages/delivery-add-specific-delivery-list-picker/delivery-add-specific-delivery-list-picker.component';
import { DeliveryAddCompleteComponent } from './pages/delivery-add-complete/delivery-add-complete.component';
import { MovieEditableComponent } from './pages/movie-editable/movie-editable.component';

// Modules
import {
  ActionsListModule,
  ActionsPickerListModule,
  ActionsPickerModule,
  ConfirmModule,
  DirectivesModule,
  EditableModule,
  FeedbackMessageModule,
  TeamWorkModule,
  UiFormModule,
  EditableSidenavModule
} from '@blockframes/ui';
import { OrganizationModule } from '@blockframes/organization';
import { MaterialModule } from '../material/material.module';
import { DeliveryRoutingModule } from './delivery-routing-module';
import { MovieModule } from '@blockframes/movie';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    DeliveryListComponent,
    DeliveryMaterialListComponent,
    DeliveryEditableComponent,
    DeliveryAddFindMovieComponent,
    DeliveryAddChooseStarterComponent,
    DeliveryAddTemplatePickerComponent,
    DeliveryAddSpecificDeliveryListPickerComponent,
    DeliveryAddSettingsComponent,
    DeliveryAddCompleteComponent,
    NewTemplateComponent,
    DeliveryTeamworkEditableComponent,
    DeliveryTemplateListComponent,
    StakeholderRepertoryComponent,
    StakeholderItemComponent,
    DeliveryActionsComponent,
    DeliveryTeamworkFormComponent,
    DeliveryTeamworkItemComponent,
    DeliveryTeamworkRepertoryComponent,
    DeliveryInformationsEditableComponent,
    DeliverySignComponent,
    DeliveryRepertoryComponent,
    DeliveryInformationsDatesDisplayComponent,
    DeliveryInformationsDatesFormComponent,
    DeliveryMaterialFormComponent,
    DeliveryInformationsStepsFormComponent,
    DeliveryInformationsStepsRepertoryComponent,
    DeliveryStatusesComponent,
    DeliveryInformationsDeadlinesFormComponent,
    DeliveryInformationsDeadlinesRepertoryComponent,
    DeliveryInformationsStakeholdersComponent,
    MovieEditableComponent,
    MovieMaterialListComponent,
    MovieMaterialFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TextFieldModule,
    MaterialModule,
    ConfirmModule,
    UiFormModule,
    ActionsListModule,
    ActionsPickerModule,
    ActionsPickerListModule,
    EditableModule,
    DirectivesModule,
    TeamWorkModule,
    OrganizationModule,
    EditableSidenavModule,
    DeliveryRoutingModule,
    MovieModule,
    FeedbackMessageModule,

    // Material
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatSortModule,
    MatStepperModule
  ],
  entryComponents: [NewTemplateComponent, DeliverySignComponent]
})
export class DeliveryModule {}
