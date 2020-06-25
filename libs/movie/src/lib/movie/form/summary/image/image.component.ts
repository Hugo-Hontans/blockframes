import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { MoviePromotionalElementsForm } from '../../promotional-elements/promotional-elements.form';

@Component({
  selector: '[promotionalElements] movie-summary-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieSummaryImageComponent implements OnInit {
  @Input() promotionalElements: MoviePromotionalElementsForm;
  @Input() link: string;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.promotionalElements.valueChanges.subscribe(_ => this.cdr.markForCheck());
  }

  get bannerHasNoValue() {
    return !this.promotionalElements.get('banner').get('media').original.get('url').value;
  }

  get posterHasNoValue() {

    const keys = Object.keys(this.promotionalElements.get('poster'));

    // if there is no poster
    if (keys.length === 0) {
      return true;
    }

    // or if at least one poster as an empty url
    return keys.some(key => !this.promotionalElements.get('poster').get(key).get('media').get('original').get('url').value);

  }

  get photoHasNoValue() {

    const keys = Object.keys(this.promotionalElements.get('still_photo'));

    // if there is no still photos
    if (keys.length === 0) {
      return true;
    }

    // or if at least one still photo as an empty url
    return keys.some(key => !this.promotionalElements.get('still_photo').get(key).get('media').get('original').get('url').value);

  }
}
