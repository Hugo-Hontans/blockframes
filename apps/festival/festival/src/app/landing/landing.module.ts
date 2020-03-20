import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ImgAssetModule } from '@blockframes/ui/theme';
import { LandingComponent } from './landing.component';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ImgAssetModule,
    // Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild([{ path: '', component: LandingComponent }])
  ]
})
export class LandingModule { }