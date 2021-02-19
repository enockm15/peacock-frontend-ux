import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MeasurementModel} from '../../../models/measurement-model';
import {MatPaginator} from '@angular/material/paginator';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {DataServerError} from '../../../models/http-models';
import {MeasurementService} from '../measurement.service';

@Component({
  selector: 'app-find-measurement',
  templateUrl: './find-measurement.component.html',
  styleUrls: ['./find-measurement.component.css']
})
export class FindMeasurementComponent implements OnInit {

  isProcessing = false;
  displayedColumns: string [] = ['id', 'description', 'unit_code', 'units', 'actions'];
  dataSource: MatTableDataSource<MeasurementModel>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatMenuTrigger, {static: true}) trigger: MatMenuTrigger;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  _measurements: MeasurementModel[];

  // subscriptions
  subscriptions: Subscription[] = [];
  list = [];
  resultEvent: EventEmitter<any> = new EventEmitter();
  $processingEvent: EventEmitter<boolean> = new EventEmitter();
  $errorsEvent: EventEmitter<DataServerError[]> = new EventEmitter();

  constructor(
    private service: MeasurementService
  ) {

  }

  ngOnInit(): void {
    this.subscriptions['$processingEvent'] = this.$processingEvent.subscribe(
      isProcessing =>
        this.isProcessing = isProcessing
    );

    this.getUnits();
    this.resultEvent.subscribe(measurements => {
      if (measurements.status.response_code === 'OK-000') {
        this._measurements = measurements.data;
        this.list = this._measurements
        // this.dataSource = new MatTableDataSource<Measurement>(this._measurements);
        // this.dataSource.sort = this.sort;
        // console.log(this.dataSource)
      }
    });

  }

  getUnits() {
    this.service.getMeasurements(this.$processingEvent, this.resultEvent, this.$errorsEvent);
  }

}
