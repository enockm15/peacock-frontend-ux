import {MeasurementModel} from './measurement-model';

export class ProductModel {
  id:any;
  code: string;
  description: string;
  category_name:string;
  category_code:string;
  product_items: ProductItemModel[];


  constructor() {
    this.id = "";
    this.code = "";
    this.description = "";
    this.category_name = "";
    this.category_code = "";
    this.product_items = [];

  }
}


export class ProductItemModel {
  id:any
  code: string
  efris_flag:string;
  unit_price:string;
  product_code:string;
  description:string;
  unit_measurement:MeasurementModel;
  category_name:string;
  category_code:string;
  quantity:string


  constructor() {
    this.id = "";
    this.code = "";
    this.efris_flag = "";
    this.unit_price = "";
    this.product_code ="";
    this.description = "";
    this.category_name = "";
    this.category_code = "";
    this.quantity = "";
    this.unit_measurement = new MeasurementModel();
  }
}
