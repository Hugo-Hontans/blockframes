import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Material } from '../../../material/+state';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'delivery-display',
  templateUrl: './delivery-display.component.html',
  styleUrls: ['./delivery-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryDisplayComponent implements OnInit {
  @Input()
  set materials(materials: Material[]) {
    this.dataSource = new MatTableDataSource(materials);
  }

  @Output() editing = new EventEmitter<string>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public dataSource: MatTableDataSource<Material>;
  public displayedColumns: string[] = ['title', 'description', 'step', 'category', 'action'];

  ngOnInit() {
    console.log(this.materials)
  }

}
