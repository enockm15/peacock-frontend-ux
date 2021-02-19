import {Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {ProductItemModel} from '../../../models/product-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataServerError} from '../../../models/http-models';
import {MeasurementService} from '../../measurement/measurement.service';
import {MeasurementModel} from '../../../models/measurement-model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  // Inputs
  @Input() items: ProductItemModel[];
  @Input() isViewOnly: boolean;
  // Objects
  productItem: ProductItemModel = new ProductItemModel();
  //arrays
  displayedColumns: string [] = ['nber','unit_measure','unit_price','efris_flag','quantity'];
  list = [];
  unitOfMeasurements = [];
  measurements: MeasurementModel[];
  // strings
  action: string = '';
  buttonIcon = 'add_circle_outline';
  buttonLabel = ' Add';

  // Booleans
  isEditing = false;
  isFormValid = false;
  // id
  productId = 0
  // Emitters
  @Output() itemEvents = new EventEmitter<ProductItemModel[]>();
  resultEvent: EventEmitter<any> = new EventEmitter();
  $processingEvent: EventEmitter<boolean> = new EventEmitter();
  $errorsEvent: EventEmitter<DataServerError[]> = new EventEmitter();

  constructor(
    private _formBuilder: FormBuilder,
    private service: MeasurementService
  ) {
    this.getUnits();
  }

  productItemForm: FormGroup = this._formBuilder.group({
    unit_price: ['', Validators.compose([Validators.required])],
    unit_measurement: ['', Validators.compose([Validators.required])],
    quantity: ['', Validators.compose([Validators.required])],
  });

  mapProductItemToControl(option:number) {
    if (option === 1) {
      this.productItem.code = "";
      this.productItem.efris_flag = "N";
      this.productItem.id = "0";
      this.productItem.description = "";
      this.productItem.product_code = "";
      this.productItem.unit_measurement = this.formControl.unit_measurement.value;
      this.productItem.unit_price = this.formControl.unit_price.value;
      this.productItem.quantity = this.formControl.quantity.value;
    } else{
      this.formControl.unit_price.setValue(this.productItem.unit_price);
      this.formControl.unit_measurement.setValue(this.productItem.unit_measurement);
      this.formControl.quantity.setValue(this.productItem.quantity);
    }
  }
  get formControl() { return this.productItemForm.controls; }

  addOrUpdateProductItem(option:number): void {
    if (this.productItemForm.valid) {
      this.mapProductItemToControl(option);
      if (option === 1) {
        console.log(this.items);
        this.list.push(this.productItem);
        this.items.push(this.productItem);
        this.list = [...this.list];
        console.log(this.list);
      } else {
        this.list[this.productId] = this.productItem;
        this.items[this.productId] = this.productItem;
        this.list = [...this.list];
      }
      this.itemEvents.emit(this.items);
      this.resetForm();
    }

  }

  manageProductItem(option:number,id?:number) {
    if (option === 2) {
      this.productItem = this.items[id];
      this.isEditing = true;
      this.productId = id;
      this.mapProductItemToControl(option);
    } else {
      this.isEditing = false;
      this.productItem = new ProductItemModel();
      this.productId =  0;
    }
    this.validateActionBarLabels(option)
  }
  getUnits() {
    this.service.getMeasurements(this.$processingEvent, this.resultEvent, this.$errorsEvent);
  }


  deleteProductItem(index:number) {
    this.list.splice(index,1);
    this.items.splice(index,1);
    this.list = [...this.list];
    this.itemEvents.emit(this.items);
    this.isEditing = false;
  }


  private resetForm() {
    this.productItemForm.reset();
    this.productItemForm.markAsPristine();
    this.productItemForm.markAllAsTouched();
    this.productItem = new ProductItemModel();
    this.validateActionBarLabels(1);
    this.manageProductItem(1)
  }


  validateActionBarLabels(option:number) {
    if (option === 1) {
      this.buttonIcon = 'add_circle_outline';
      this.buttonLabel = 'Add Item';
    } else {
      this.buttonIcon = 'save';
      this.buttonLabel = 'Save';
    }
  }

  ngOnInit(): void {
    console.log(this.items)
    if (this.items) {
      this.items.forEach(o => { this.list.push(o)});
    }
    this.resultEvent.subscribe(measurements => {
      if (measurements.status.response_code === 'OK-000') {
        this.measurements = measurements.data;
        this.unitOfMeasurements = this.measurements
        // console.log(this.unitOfMeasurements)
      }
    });
  }

}
