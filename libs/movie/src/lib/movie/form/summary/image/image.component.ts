import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { MovieForm } from '../../movie.form';
import { PromotionalHostedMedia } from '@blockframes/movie/+state/movie.firestore';

@Component({
  selector: '[form] movie-summary-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieSummaryImageComponent implements OnInit {
  @Input() form: MovieForm;
  @Input() link: string;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.form.promotionalElements.valueChanges.subscribe(_ => this.cdr.markForCheck());
  }

  get photoHasNoValue() {
    try {
      const stillPhotos: Record<string, PromotionalHostedMedia> = this.form.promotionalElements.get('still_photo').value;
      const keys = Object.keys(stillPhotos);

      // if there is no still photos
      return keys.length === 0 ?
        true :
        // or if at least one still photo as an empty url
        keys.some(key => !stillPhotos[key].media.url);

    } catch (error) {
      console.warn(error);
      return true;
    }
  }
}
