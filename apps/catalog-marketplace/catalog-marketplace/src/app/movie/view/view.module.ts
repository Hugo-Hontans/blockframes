// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

// Component
import { MovieViewComponent } from './view.component';

// Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
<<<<<<< HEAD

=======
>>>>>>> added guard

@NgModule({
  declarations: [MovieViewComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: MovieViewComponent }
    ])
  ],
})
export class MovieViewModule {}
