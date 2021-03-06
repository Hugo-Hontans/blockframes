import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TunnelPageComponent } from './page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
const material = [
  MatButtonModule,
  MatIconModule
]

@NgModule({
  declarations: [ TunnelPageComponent ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ...material
  ],
  exports: [TunnelPageComponent]
})
export class TunnelPageModule {}
