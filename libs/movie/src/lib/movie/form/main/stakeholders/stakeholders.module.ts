import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChipsAutocompleteModule } from '@blockframes/ui/form/chips-autocomplete/chips-autocomplete.module';

// Components
import { StakeholdersComponent } from './stakeholders.component';
// Material
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'

@NgModule({
  declarations: [StakeholdersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ChipsAutocompleteModule,
    // Material
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [StakeholdersComponent]
})
export class MovieFormStakeholdersModule { }
