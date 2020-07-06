import { Component, ChangeDetectionStrategy, Directive, ContentChild, TemplateRef, Input, AfterContentInit } from '@angular/core';
import { Movie } from '@blockframes/movie/+state/movie.model';
import { fadeList } from '@blockframes/utils/animations/fade';

@Directive({selector: '[titleAppBarSearch]'})
export class TitleAppBarSearchDirective {}

@Directive({selector: '[titleSort]'})
export class TitleSortDirective {}

@Directive({selector: '[titleSearch]'})
export class TitleSearchDirective {}

@Directive({selector: '[titleCard]'})
export class TitleCardDirective {}
@Directive({selector: '[titleListItem]'})
export class TitleListItemDirective {}

@Component({
  selector: '[titles] title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.scss'],
  animations: [fadeList('.card')],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleListComponent implements AfterContentInit {

  @ContentChild(TitleAppBarSearchDirective, { read: TemplateRef }) appBarTitleSearchTemplate: TitleAppBarSearchDirective;
  @ContentChild(TitleSortDirective, { read: TemplateRef }) titleSortTemplate: TitleSortDirective;
  @ContentChild(TitleSearchDirective, { read: TemplateRef }) titleSearchTemplate: TitleSearchDirective;
  @ContentChild(TitleCardDirective, { read: TemplateRef }) titleCardTemplate: TitleCardDirective;
  @ContentChild(TitleListItemDirective, { read: TemplateRef }) titleListItemTemplate: TitleListItemDirective;

  @Input() titles: Movie[];

  @Input() titleType = 'title'; // only for display purpose

  public listView = false;
  public canToggle = false;

  ngAfterContentInit() {
    if (!!this.titleCardTemplate && !!this.titleListItemTemplate) {
      this.canToggle = true;
    } else if (!!this.titleListItemTemplate) {
      this.listView = true;
    }
  }

  trackById(movie: Movie) {
    return movie.id;
  }
}
