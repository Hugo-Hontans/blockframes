import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationComponent } from './invitation.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { InvitationListModule } from '@blockframes/invitation/components/list/list.module';

@NgModule({
  declarations: [InvitationComponent],
  imports: [
    CommonModule,
    InvitationListModule,
    FlexLayoutModule,
    RouterModule.forChild([{ path: '', component: InvitationComponent }])
  ]
})
export class InvitationModule { }
