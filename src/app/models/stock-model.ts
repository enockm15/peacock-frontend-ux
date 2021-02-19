export interface StockInterface {
  count_value: string;
  card_value: string;
  varianceQuantity: string;
  varianceCost: string;
  stocked_item:string;
  status:string;
}


export class StockModel {
  itemId:any;
  operationType: any;
  supplier: string;
  supplierTin: string
  adjustTypes:any;
  remarks:string;
  stockInType:any;
  quantity: string;

  constructor( ) {
    this.itemId = "";
    this.operationType = OperationType;
    this.stockInType = StockInType;
    this.supplier = "";
    this.supplierTin = "";
    this.adjustTypes = AdjustTypes;
    this.remarks = "";
    this.quantity = ""
  }
}

export enum OperationType {
  INCREASE_INVENTORY = '101',
  DECREASE_INVENTORY= '102'
}

export enum AdjustTypes {
  EXPIRED = '101',
  DAMAGED = '102',
  PERSONAL_USE = '103',
  RAW_MATERIALS = '104',
  OTHERS = '105',
  EMPTY  = ''
}

export enum StockInType {
  IMPORT = '101',
  LOCAL_PURCHASE = '102',
  MANUFACTURE = '103',
  EMPTY = ''
}
