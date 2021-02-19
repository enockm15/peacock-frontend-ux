import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {ProductItemModel, ProductModel} from '../../../models/product-model';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../product.service';
import {CategoryModel, GOODS_CATEGORY} from '../../../models/category-model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  //Objects
  product: ProductModel = new ProductModel();
  productItem: ProductItemModel = new ProductItemModel();
  category: CategoryModel = new CategoryModel();
  //arrays
  productItems: ProductItemModel[] = [];
  categories: CategoryModel[];
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
  $productResultEvent: EventEmitter<any> = new EventEmitter();
  _$productResultEvent: EventEmitter<any> = new EventEmitter();
  // sweetAlert
  @ViewChild('approvedSwal', {static: false}) private approvedSwal: SwalComponent;

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.formActivator(this.activatedRoute.routeConfig.data.action);
    this.categories = GOODS_CATEGORY;
  }

  productForm: FormGroup = this.fb.group({
    product_code: ['', Validators.compose([Validators.required])],
    description: ['', Validators.compose([Validators.required])],
    categories:  ['', Validators.compose([Validators.required])],
  });


  get formControl() {
    return this.productForm.controls;
  }

  mapProductFormData() {
    if (this.validateApplicationForm()) {
      this.isFormValid = true;
      if (this.action === 'CREATE') {
        this.product.id = '0';
      }
      this.product.code = this.formControl.product_code.value;
      this.product.description = this.formControl.description.value;
      this.product.product_items = this.productItems;
      this.product.category_code = this.formControl.categories.value.code;
      this.product.category_name = this.formControl.categories.value.description;
    } else {
      this.isFormValid = false;
    }
  }

  validateApplicationForm(): boolean {
    return (
      (this.productForm.valid && this.productForm.touched) ||
      this.productForm.status === 'DISABLED'
    );
  }

  submitProduct() {
    this.mapProductFormData();
    if (this.isFormValid) {
      switch (this.action) {
        case 'EDIT':

          this.service.updateProduct(this.product, this.$processing, this.$productResultEvent, this.$errorsEvent);
          break;
        case 'CREATE':
          this.service.saveProduct(this.product, this.$processing, this.$resultEvent, this.$errorsEvent);
          break;
      }
    }
  }

  getById() {
    this.service.getProductByID(
      this.activatedRoute.snapshot.paramMap.get('productId'),
      this.$processing,
      this._$productResultEvent,
      this.$errorsEvent
    );
  }

  resetForm() {
    this.productForm.reset();
    this.productForm.markAsUntouched();
    this.productForm.markAsPristine();
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoaded = true;
    }, 500);

    this.$resultEvent.subscribe(result => {
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

    this.$productResultEvent.subscribe(result => {
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

    this._$productResultEvent.subscribe(product => {
      if (product.status.response_code === 'OK-0000') {
        this.product = product.data[0].data_item;
        this.mapField();
      }
    });

  }

  mapField() {
    this.isFormValid = true;
    this.category.code = this.product.category_code;
    this.category.description = this.product.category_name;
    this.categories.push(this.category)
    this.formControl.product_code.setValue(this.product.code);
    this.formControl.description.setValue(this.product.description);
    this.formControl.categories.setValue(this.category);
  }

  onProductItemChange($event: ProductItemModel[]) {
      this.productItems = $event;
  }

  formActivator(operation: string) {
    console.log(operation);
    switch (operation) {
      case 'VIEW':
        this.action = 'VIEW';
        this.isViewOnly = true;
        this.getById();
        this.productForm.disable();
        break;
      case 'CREATE':
        this.action = 'CREATE';
        this.productForm.enable();
        break;
      case 'EDIT':
        this.action = 'EDIT';
        this.getById();
        this.productForm.enable();
        break;
    }
  }


}
