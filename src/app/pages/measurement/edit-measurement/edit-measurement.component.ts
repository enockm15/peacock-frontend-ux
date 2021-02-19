import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MeasurementModel, Unit, UNIT_OF_MEASUREMENT} from '../../../models/measurement-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MeasurementService} from '../measurement.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-edit-measurement',
  templateUrl: './edit-measurement.component.html',
  styleUrls: ['./edit-measurement.component.css']
})
export class EditMeasurementComponent implements OnInit {

  // Objects
  _measurement: MeasurementModel = new MeasurementModel();
  unit: Unit = new Unit();
  //arrays
  uTypes: Unit[];
  // strings
  action: string = '';
  // Booleans
  isFormValid = false;
  // Emitters
  $processing: EventEmitter<boolean> = new EventEmitter();
  errorsEvent: EventEmitter<any> = new EventEmitter();
  resultEvent: EventEmitter<any> = new EventEmitter();
  unitResultEvent: EventEmitter<any> = new EventEmitter();
  _unitResultEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('approvedSwal', {static: false}) private approvedSwal: SwalComponent;


  constructor(
    private fb: FormBuilder,
    private service: MeasurementService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.uTypes = UNIT_OF_MEASUREMENT;
    this.formActivator(this.activatedRoute.routeConfig.data.action);
  }


  measureForm: FormGroup = this.fb.group({
    measurementType: ['', Validators.compose([Validators.required])],
    units: ['', Validators.compose([Validators.required])],
  });

  mapMeasureFormData() {
    if (this.validateApplicationForm()) {
      if (this.action === 'CREATE') {
        this._measurement.id = '0';
      }
      this._measurement.unit_code = this.formControl.measurementType.value.description;
      this._measurement.description = this.formControl.measurementType.value.code;
      this._measurement.units = this.formControl.units.value;
      this.isFormValid = true;
    } else {
      this.isFormValid = false;
    }
  }


  validateApplicationForm(): boolean {
    return (
      (this.measureForm.valid && this.measureForm.touched) ||
      this.measureForm.status === 'DISABLED'
    );
  }

  submitCase() {
    this.mapMeasureFormData();
    if (this.isFormValid) {
      switch (this.action) {
        case 'EDIT':
          this.service.updateMeasurement(this._measurement, this.$processing, this._unitResultEvent, this.errorsEvent);
          break;
        case 'CREATE':
          this.service.saveMeasurement(this._measurement, this.$processing, this.resultEvent, this.errorsEvent);
          break;
      }
    }
  }

  getById() {
    this.service.getMeasurementByID(
      this.activatedRoute.snapshot.paramMap.get('unitId'),
      this.$processing,
      this.unitResultEvent,
      this.errorsEvent
    );
  }

  get formControl() {
    return this.measureForm.controls;
  }

  resetForm() {
    this.measureForm.reset();
    this.measureForm.markAsUntouched();
    this.measureForm.markAsPristine();
  }


  ngOnInit() {

    this.resultEvent.subscribe(result => {
      if (result.status.response_code === 'OK-0000') {
        this.resetForm();
        this.approvedSwal.text = result.status.response_message;
        this.approvedSwal.icon = 'success';
        this.approvedSwal.title = 'SUCCESS';
        this.approvedSwal.fire().then();
      } else {
        this.approvedSwal.text = result.status.response_message;
        this.approvedSwal.icon = 'error';
        this.approvedSwal.title = 'ERROR';
        this.approvedSwal.fire().then();
      }
    });

    this._unitResultEvent.subscribe(result => {
      if (result.status.response_code === 'OK-0000') {
        this.resetForm();
        this.approvedSwal.text = result.status.response_message;
        this.approvedSwal.icon = 'success';
        this.approvedSwal.title = 'SUCCESS';
        this.approvedSwal.fire().then();
      } else {
        this.approvedSwal.text = result.status.response_message;
        this.approvedSwal.icon = 'error';
        this.approvedSwal.title = 'ERROR';
        this.approvedSwal.fire().then();
      }
    });


    this.unitResultEvent.subscribe(measurement => {
      if (measurement.status.response_code === 'OK-0000') {
        this._measurement = measurement.data[0].data_item;
        this.mapField();
      }
    });
  }

  mapField() {
    this.isFormValid = true;
    this.unit.description = this._measurement.unit_code;
    this.unit.code = this._measurement.description
    this.uTypes.push(this.unit)
    this.formControl.measurementType.setValue(this.unit);
    this.formControl.units.setValue(this._measurement.units);
  }

  formActivator(operation: string) {
    console.log(operation);
    switch (operation) {
      case 'VIEW':
        this.action = 'VIEW';
        this.getById();
        this.measureForm.disable();
        break;
      case 'CREATE':
        this.action = 'CREATE';
        this.measureForm.enable();
        break;
      case 'EDIT':
        this.action = 'EDIT';
        this.getById();
        this.measureForm.enable();
        break;
    }
  }

  ngOnDestroy() {
  }

}
