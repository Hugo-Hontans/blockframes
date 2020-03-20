// Angular
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Libraries
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { TranslateSlugModule } from '@blockframes/utils/pipes/translate-slug.module';
import { CropperModule } from '@blockframes/ui/media/cropper/cropper.module';

// Pages
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CropperModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCarouselModule,
    TranslateSlugModule,
    MatIconModule,
    MatSnackBarModule, 
    RouterModule.forChild([{ path: '', component: HomeComponent }])
  ]
})
export class HomeModule {}