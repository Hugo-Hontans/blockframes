import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { ImageReferenceModule } from '@blockframes/ui/media/image-reference/image-reference.module';
import { WishlistButtonModule } from "@blockframes/organization/components/wishlist-button/wishlist-button.module";
import { FlexLayoutModule } from '@angular/flex-layout';

// Pipes
import { DisplayNameModule } from '@blockframes/utils/pipes/display-name.module';
import { MovieFeatureModule } from '../../pipes/movie-feature.module';
import { MovieImageModule } from './movie-image.pipe';

// Material
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent],
  imports: [
    CommonModule,
    RouterModule,
    ImageReferenceModule,
    DisplayNameModule,
    WishlistButtonModule,
    MovieFeatureModule,
    MovieImageModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class MovieCardModule { }
