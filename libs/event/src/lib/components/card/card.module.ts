import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ScreeningBackgroundPipe } from './card.component';
import { ImageReferenceModule } from '@blockframes/ui/media';



@NgModule({
  declarations: [CardComponent, ScreeningBackgroundPipe],
  exports: [CardComponent],
  imports: [
    CommonModule,
    ImageReferenceModule,
  ]
})
export class EventCardModule { }
