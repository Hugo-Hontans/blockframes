import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// Components
import { MovieMaterialsComponent } from './movie-materials/movie-materials.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { ConfirmComponent } from './delivery-new-template/confirm.component';
import { NewTemplateComponent } from './delivery-new-template/new-template.component';
import { DeliveryGuard } from './guards/delivery.guard';
import { DeliveryViewComponent } from './delivery-view/delivery-view.component';
import { MaterialModule } from '../material/material.module';
import { TemplatePickerComponent } from '../template/template-picker/template-picker.component';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import {
  MatInputModule,
  MatMenuModule,
  MatSidenavModule,
  MatDialogModule,
  MatSelectModule,
  MatOptionModule,
  MatExpansionModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { DeliverySettingsComponent } from './delivery-settings/delivery-settings.component';



const routes: Routes = [
  { path: '', component: DeliveryListComponent },
  {
    path: 'movie-materials',
    component: MovieMaterialsComponent
  },
  { path: 'list', component: DeliveryListComponent },
  {
    path: 'view/:id',
    canActivate: [DeliveryGuard],
    component: DeliveryViewComponent
  },
  {
    path: 'form/:id',
    // canActivate: [DeliveryGuard],   //TODO: make this path to not redirected to default path when guard is active
    component: DeliveryFormComponent
  },
  {
    path: 'form/:id/settings',
    // canActivate: [DeliveryGuard],   //TODO: make this path to not redirected to default path when guard is active
    component: DeliverySettingsComponent
  }
];

@NgModule({
  declarations: [
    MovieMaterialsComponent,
    DeliveryListComponent,
    DeliveryViewComponent,
    DeliveryFormComponent,
    NewTemplateComponent,
    ConfirmComponent,
    DeliveryViewComponent,
    DeliverySettingsComponent,
    TemplatePickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MaterialModule,

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

    RouterModule.forChild(routes)
  ],
  entryComponents: [TemplatePickerComponent, NewTemplateComponent, ConfirmComponent]
})
export class DeliveryModule {}
