import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// Components
import { MovieMaterialsComponent } from './movie-materials/movie-materials.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { NewTemplateComponent } from './delivery-new-template/new-template.component';
import { DeliveryViewComponent } from './delivery-view/delivery-view.component';
import { DeliveryTemplatePickerComponent } from './delivery-template-picker/delivery-template-picker.component';
import { DeliveryTeamWorkViewComponent } from './delivery-team-work-view/delivery-team-work-view.component';
import { StakeholderListComponent } from './stakeholder-list/stakeholder-list.component';
import { StakeholderItemComponent } from './stakeholder-item/stakeholder-item.component';
import { DeliveryItemComponent } from './delivery-item/delivery-item.component';
import { FiltersComponent } from './movie-materials/filters/filters.component';
import { ActionsComponent } from './movie-materials/actions/actions.component';
import { MovieMaterialItemComponent } from './movie-material-item/movie-material-item.component';
import { DeliveryViewItemComponent } from './delivery-view-item/delivery-view-item.component';
import { DeliveryTeamWorkFormComponent } from './delivery-team-work-form/delivery-team-work-form.component';
import { DeliveryTeamWorkItemComponent } from './delivery-team-work-item/delivery-team-work-item.component';
import { DeliveryTeamWorkListComponent } from './delivery-team-work-list/delivery-team-work-list.component';
import { DeliverySettingsItemComponent } from './delivery-settings-item/delivery-settings-item.component';
import { DeliverySettingsFormComponent } from './delivery-settings-form/delivery-settings-form.component';
import { DeliverySettingsViewComponent } from './delivery-settings-view/delivery-settings-view.component';
import { DeliverySignComponent } from './delivery-sign/delivery-sign.component';
import { DeliveryEmptyComponent } from './delivery-empty/delivery-empty.component';

// Modules
import { MaterialModule } from '../material/material.module';
import {
  EditableModule,
  DirectivesModule,
  TeamWorkModule,
  ConfirmModule,
  UiFormModule
} from '@blockframes/ui';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';

// Guards
import { DeliveryActiveGuard } from './guards/delivery-active.guard';
import { DeliveryListGuard } from './guards/delivery-list.guard';
import {
  DeliveryMaterialsGuard,
  MovieMaterialsGuard,
  SignedDeliveryMaterialsGuard,
 } from '../material';
import { TemplateListGuard } from '../template/guards/template-list.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    canActivate: [DeliveryListGuard],
    canDeactivate: [DeliveryListGuard],
    component: DeliveryListComponent
  },
  {
    path: 'template-picker',
    canActivate: [TemplateListGuard],
    canDeactivate: [TemplateListGuard],
    component: DeliveryTemplatePickerComponent
  },
  {
    path: 'movie-materials',
    canActivate: [MovieMaterialsGuard],
    canDeactivate: [MovieMaterialsGuard],
    component: MovieMaterialsComponent
  },
  {
    path: ':deliveryId',
    canActivate: [DeliveryActiveGuard],
    canDeactivate: [DeliveryActiveGuard],
    children : [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full'
      },
      {
        path: 'view',
        canActivate: [SignedDeliveryMaterialsGuard],
        canDeactivate: [SignedDeliveryMaterialsGuard],
        component: DeliveryViewComponent
      },
      {
        path: 'edit',
        canActivate: [DeliveryMaterialsGuard],
        canDeactivate: [DeliveryMaterialsGuard],
        component: DeliveryFormComponent
      },
      {
        path: 'teamwork',
        component: DeliveryTeamWorkViewComponent
      },
      {
        path: 'settings',
        canActivate: [DeliveryMaterialsGuard],
        canDeactivate: [DeliveryMaterialsGuard],
        component: DeliverySettingsViewComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    MovieMaterialsComponent,
    DeliveryListComponent,
    DeliveryViewComponent,
    DeliveryFormComponent,
    NewTemplateComponent,
    DeliveryTeamWorkViewComponent,
    DeliveryTemplatePickerComponent,
    StakeholderListComponent,
    StakeholderItemComponent,
    DeliveryItemComponent,
    FiltersComponent,
    ActionsComponent,
    MovieMaterialItemComponent,
    DeliveryViewItemComponent,
    DeliveryTeamWorkFormComponent,
    DeliveryTeamWorkItemComponent,
    DeliveryTeamWorkListComponent,
    DeliverySettingsItemComponent,
    DeliverySettingsFormComponent,
    DeliverySettingsViewComponent,
    DeliverySignComponent,
    DeliveryEmptyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MaterialModule,
    ConfirmModule,
    UiFormModule,
    EditableModule,
    DirectivesModule,
    TeamWorkModule,

    // Material
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

    RouterModule.forChild(routes)
  ],
  entryComponents: [NewTemplateComponent, DeliverySignComponent,]
})
export class DeliveryModule {}
