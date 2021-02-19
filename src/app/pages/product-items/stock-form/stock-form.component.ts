import {Component, EventEmitter, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AdjustTypes, OperationType, StockInterface, StockInType, StockModel} from '../../../models/stock-model';
import {ProductItemModel} from '../../../models/product-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductItemService} from '../product-item.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  //Objects
  productItem: ProductItemModel = new ProductItemModel();
  stock: StockModel = new StockModel();
  //arrays
  inventoryType: any[] = [];
  stockInType: any[] = [];
  adjustTypes: any[] = [];
  //string
  action: string = '';
  // booleans
  isFormValid = false;
  isViewOnly = false;
  isLoaded = false;

  //Emitters
  $processing: EventEmitter<boolean> = new EventEmitter();
  $errorsEvent: EventEmitter<any> = new EventEmitter();
  $resultEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('approvedSwal', {static: false}) private approvedSwal: SwalComponent;

  // sweetAlert
  constructor(
    public dialogRef: MatDialogRef<StockFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductItemModel,
    private fb: FormBuilder,
    private service: ProductItemService
  ) {
  }


  stockForm: FormGroup = this.fb.group({
    count_value: ['', Validators.compose([Validators.required])],
    inventoryType: ['', Validators.compose([Validators.required])],
    remarks: ['', Validators.compose([Validators.required])],
    adjustType: ['', Validators.compose([Validators.required])],
    stockInType: [''],
    supplierTin: [''],
    supplier: [''],
  });


  submitStock() {
    this.mapStockFormData();

  }

  mapStockFormData() {
    if (this.validateApplicationForm()) {
      this.isFormValid = true;
      this.productItem = this.data;
      this.stock.quantity = this.formControl.count_value.value;
      this.stock.itemId = this.productItem.id;
      this.stock.operationType = this.formControl.inventoryType.value.key;
      this.stock.supplierTin = this.formControl.supplierTin.value;
      this.stock.supplier = this.formControl.supplier.value;
      this.stock.remarks = this.formControl.remarks.value;
      this.stock.stockInType = this.formControl.stockInType.value.key;
      this.stock.adjustTypes = this.formControl.adjustType.value.key
      console.log(this.stock);
    } else {
      this.isFormValid = false;
    }
  }

  get formControl() {
    return this.stockForm.controls;
  }

  mapField() {
    this.isFormValid = true;

  }

  resetForm() {
    this.stockForm.reset();
    this.stockForm.markAsUntouched();
    this.stockForm.markAsPristine();
  }

  validateApplicationForm(): boolean {
    return (
      (this.stockForm.valid && this.stockForm.touched) ||
      this.stockForm.status === 'DISABLED'
    );
  }


  onSubmit() {
    this.mapStockFormData();
    if (this.isFormValid) {
      this.service.updateEfrisStock(this.stock, this.$processing, this.$errorsEvent, this.$resultEvent);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  inventorySelected() {
    let selected = this.stockForm.get('inventoryType').value;
    console.log(selected)
    if (selected.value === '101') {
      this.stockForm.get('remarks').disable();
      this.stockForm.get('adjustType').setValue('');
      this.stockForm.get('adjustType').disable();
      this.stockForm.get('supplierTin').setValue('1000020958');
      this.stockForm.get('supplier').setValue('PEACOCK');
      this.stockForm.get('supplierTin').disable();
      this.stockForm.get('supplier').disable();
    } else if (selected === '102') {

      if (this.stockForm.get('stockInType').value.value === '103') {
        this.stockForm.get('supplierTin').setValue('');
        this.stockForm.get('supplier').setValue('');
        this.stockForm.get('supplierTin').disable();
        this.stockForm.get('supplier').disable();
      }


    }
  }

  adjustTypeSelected() {
    let selected  =  this.stockForm.get('adjustType').value;
    if (selected.value === '104') {
      this.stockForm.get('remarks').enable();
    } else
      this.stockForm.get('remarks').disable();
  }


  ngOnInit(): void {
    this.$resultEvent.subscribe(response => {
      if (response.status.response_code === 'OK-0000') {
        // this.resetForm();
        // this.approvedSwal.text = response.status.response_message;
        // this.approvedSwal.icon = 'success';
        // this.approvedSwal.title = 'SUCCESS';
        this.dialogRef.close({
          text: response.status.response_message,
          icon:'success',
          title: 'SUCCESS'
        });
      } else {
        // this.approvedSwal.text = response.status.response_message;
        // this.approvedSwal.icon = 'error';
        // this.approvedSwal.title = 'ERROR';
        this.dialogRef.close({
          text: response.status.response_message,
          icon:'error',
          title: 'ERROR'
        });
      }

    });



    this.inventoryType = Object.entries(OperationType)
      .map(([key, value]) => ({key: key, value: value}));


    this.stockInType = Object.entries(StockInType)
      .map(([key, value]) => ({key: key, value: value}));


    this.adjustTypes = Object.entries(AdjustTypes)
      .map(([key, value]) => ({key: key, value: value}));

  }

}
