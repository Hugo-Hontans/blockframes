import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MovieFormShellComponent } from '../shell/shell.component';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'movie-form-story-elements',
  templateUrl: './story-elements.component.html',
  styleUrls: ['./story-elements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieFormStoryElementsComponent implements OnInit {
  values$: Observable<string[]>;
  form = this.shell.form;
  keyword = new FormControl();
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private shell: MovieFormShellComponent) { }

  ngOnInit() {
    this.values$ = this.form.keywords.valueChanges.pipe(startWith(this.form.keywords.value));
  }

  public add(event: MatChipInputEvent): void {
    const { value = '' } = event;

    this.form.keywords.add(value)
    this.keyword.reset();
  }

  public remove(i: number): void {
    this.form.keywords.removeAt(i);
  }
}
