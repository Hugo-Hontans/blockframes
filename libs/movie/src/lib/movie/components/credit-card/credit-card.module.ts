import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardComponent, RoleIconPipe } from './credit-card.component';

import { DisplayNameModule, MaxLengthModule, TranslateSlugModule } from '@blockframes/utils/pipes';
import { FilmographyPipeModule } from '../../pipes/filmography.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [CreditCardComponent, RoleIconPipe],
  exports: [CreditCardComponent],
  imports: [
    CommonModule,
    FilmographyPipeModule,
    TranslateSlugModule,
    DisplayNameModule,
    MaxLengthModule,
    FlexLayoutModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatTooltipModule
  ]
})
export class CreditCardModule { }
