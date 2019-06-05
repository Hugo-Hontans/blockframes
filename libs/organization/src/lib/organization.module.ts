import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '@blockframes/auth';
import { OrgFormComponent } from './org-form/org-form.component';
import { OrgListComponent } from './org-list/org-list.component';
import { OrgShowComponent } from './org-show/org-show.component';
import { OrgMembersShowComponent } from './org-members-show/org-members-show.component';
import { OrgWidgetComponent } from './org-widget/org-widget.component';
import { OrganizationActiveGuard } from './guards/organization-active.guard';

export const organizationRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'form',
    component: OrgFormComponent
  },
  {
    path: 'list',
    component: OrgListComponent,
  },
  {
    path: ':orgId',
    component: OrgShowComponent,
    canActivate: [OrganizationActiveGuard],
    canDeactivate: [OrganizationActiveGuard],
  }
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    AuthModule,
    RouterModule.forChild(organizationRoutes)
  ],
  declarations: [
    OrgListComponent,
    OrgFormComponent,
    OrgShowComponent,
    OrgMembersShowComponent,
    OrgWidgetComponent
  ],
  exports: [
    OrgWidgetComponent
  ]
})
export class OrganizationModule {
}
