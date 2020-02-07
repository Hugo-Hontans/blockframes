import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getLabelBySlug, Scope } from '@blockframes/utils/static-model/staticModels';

@Component({
  selector: '[control] [link] missing-control',
  templateUrl: './missing-control.component.html',
  styleUrls: ['./missing-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissingControlComponent implements OnInit {
  @Input() control: FormControl;
  @Input() scope: Scope;
  @Input() link: string;
  @Input() isLast = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.control.valueChanges.subscribe(_ => this.cdr.markForCheck());
  }

  get values() {
    const values = Array.isArray(this.control.value) ? this.control.value : [this.control.value];
    return values.map(value => getLabelBySlug(this.scope, value)).join(', ');
  }
}
