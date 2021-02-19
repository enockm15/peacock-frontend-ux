import {GoodsDetails, PayWay, Summary, TaxDetails} from './invoice-model';

export class CreditNoteRequestModel {
  reason_code: string;
  reason:string;
  invoiceId:any;

  constructor() {
    this.reason_code = "";
    this.reason = "";
    this.invoiceId = "";
  }
}


export enum CreditNoteReason {
  PRODUCT_RETURN ="101",
  PURCHASE_CANCELLATION  = "102",
  INCORRECT_AMOUNT =  "103",
  PRODUCT_WAIVE_OFF = "104",
  OTHERS  = "105"
}

export class CreditNoteCancelModel {
  oriInvoiceId: string;
  invoiceNo:string;
  reason:string;
  reasonCode:string;
  invoiceApplyCategoryCode:string;

  constructor() {
    this.oriInvoiceId = "";
    this.invoiceNo = "";
    this.reason = "";
    this.reasonCode = "";
    this.invoiceApplyCategoryCode = "";
  }
}
export class CreditNoteModel {
  id:any;
  oriInvoiceId:string;
  oriInvoiceNo:string;
  reasonCode: any;
  reason:string;
  applicationTime:string;
  invoiceApplyCategoryCode:string;
  currency:string;
  contactName:string;
  contactEmail:string;
  contactMobileNumber:string;
  source:string;
  referenceNo:string;
  remark:string;
  responseCode:string;
  responseMessage:string;
  sellerReferenceNo:string;
  goodsDetails: GoodsDetails [];
  summary: Summary;
  taxDetails: TaxDetails[];
  payWay: PayWay[];


  constructor() {
    this.id = "";
    this.oriInvoiceId = "";
    this.oriInvoiceNo = "";
    this.reasonCode = "";
    this.reason = "";
    this.applicationTime = "";
    this.invoiceApplyCategoryCode = "";
    this.currency = "";
    this.contactName = "";
    this.contactEmail = "";
    this.contactMobileNumber = "";
    this.source = "";
    this.referenceNo = "";
    this.remark = "";
    this.responseCode = "";
    this.responseMessage = "";
    this.sellerReferenceNo = "";
    this.goodsDetails = [];
    this.summary = new Summary();
    this.taxDetails = [];
    this.payWay = [];
  }
}
