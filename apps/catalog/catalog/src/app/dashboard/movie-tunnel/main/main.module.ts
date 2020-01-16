import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TunnelMainComponent } from './main.component';
import { TunnelPageModule } from '@blockframes/ui/tunnel/page/tunnel-page.module';

// Materials
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

// Form modules
import { MovieFormContentTypeModule } from '@blockframes/movie/movie/form/main/content-type/content-type.module';
import { MovieFormDirectorsModule } from '@blockframes/movie/movie/form/main/directors/directors.module';
import { MovieFormLanguagesModule } from '@blockframes/movie/movie/form/main/languages/languages.module';
import { MovieFormGenresModule } from '@blockframes/movie/movie/form/main/genres/genres.module';
import { MovieFormTotalRuntimeModule } from '@blockframes/movie/movie/form/main/total-runtime/total-runtime.module';
import { MovieFormOriginalReleasesModule } from '@blockframes/movie/movie/form/sales-info/original-releases/original-releases.module';

@NgModule({
  declarations: [TunnelMainComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MovieFormContentTypeModule,
    MovieFormDirectorsModule,
    MovieFormLanguagesModule,
    MovieFormGenresModule,
    MovieFormTotalRuntimeModule,
    MovieFormOriginalReleasesModule,
    TunnelPageModule,
    // Material
    MatCardModule,
    MatDividerModule,
    // Routes
    RouterModule.forChild([{ path: '', component: TunnelMainComponent }])
  ]
})
export class MainTunnelModule { }
