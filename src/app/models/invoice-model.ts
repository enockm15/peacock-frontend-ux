export class InvoiceModel {
  id:any;
  basicInformation: BasicInformation;
  buyerDetails:Buyer;
  efris_flag: string;
  goodsDetails: GoodsDetails[];
  payWay: PayWay[];
  sellerDetails: Seller;
  summary:Summary;
  taxDetails: TaxDetails[];
  extend:Extend;

  constructor() {
    this.id = "";
    this.basicInformation = new BasicInformation();
    this.buyerDetails = new Buyer();
    this.efris_flag = "";
    this.goodsDetails = [];
    this.payWay = [];
    this.sellerDetails = new Seller();
    this.summary = new Summary();
    this.taxDetails = [];
    this.extend = new Extend();

  }

}

export class BasicInformation {
  antiFakeCode:string
  currency:string
  dataSource:string
  deviceNo:string
  invoiceIndustryCode:string
  invoiceKind:string
  invoiceNo:string
  invoiceType:string
  invoiceId:string;
  isBatch:string
  issueDate:string
  operator:string
  oriInvoiceId:string

  constructor() {
    this.antiFakeCode = "";
    this.currency = "";
    this.dataSource = "";
    this.deviceNo = "";
    this.invoiceIndustryCode = "";
    this.invoiceKind = "";
    this.invoiceNo = "";
    this.invoiceType = "";
    this.isBatch = "";
    this.issueDate = "";
    this.operator = "";
    this.oriInvoiceId = "";
    this.invoiceId = "";
  }
}


export class Buyer {
  businessName:string
  buyerAddress:string
  buyerCitizenship:string
  buyerEmail:string
  buyerLegalName:string
  buyerLinePhone:string
  buyerNinBrn:string
  buyerPlaceOfBusi:string
  buyerReferenceNo:string
  buyerSector:string
  buyerTin:string
  buyerType:string
  mobilePhone:string

  constructor() {
    this.businessName = "";
    this.buyerAddress = "";
    this.buyerCitizenship = "";
    this.buyerEmail = "";
    this.buyerLegalName = "";
    this.buyerLinePhone = "";
    this.buyerNinBrn = "";
    this.buyerPlaceOfBusi = "";
    this.buyerReferenceNo = "";
    this.buyerSector = "";
    this.buyerTin = "";
    this.buyerType = "";
    this.mobilePhone = "";
  }
}

export class GoodsDetails {
  categoryId:string;
  categoryName:string;
  deemedFlag:string;
  discountFlag:string;
  discountTaxRate:string;
  discountTotal:string;
  exciseCurrency:string;
  exciseFlag:string;
  exciseRate:string;
  exciseRateName:string;
  exciseRule:string;
  exciseTax:string;
  exciseUnit:string;
  goodsCategoryId:string;
  goodsCategoryName:string;
  item:string;
  itemCode:string;
  orderNumber:string;
  pack:string;
  qty:string;
  stick:string;
  tax:string;
  taxRate:string;
  total:string;
  unitOfMeasure:string;
  unitPrice:string;

  constructor(){
    this.categoryId = "";
    this.categoryName = "";
    this.deemedFlag = "";
    this.discountFlag = "";
    this.discountTaxRate = "";
    this.discountTotal = "";
    this.exciseCurrency = "";
    this.exciseFlag = "";
    this.exciseRate = "";
    this.exciseRateName = "";
    this.exciseRule = "";
    this.exciseTax = "";
    this.exciseUnit = "";
    this.goodsCategoryId = "";
    this.goodsCategoryName = "";
    this.item = "";
    this.itemCode = "";
    this.orderNumber = "";
    this.pack = "";
    this.qty = "";
    this.stick = "";
    this.tax = "";
    this.taxRate = "";
    this.total = "";
    this.unitOfMeasure = "";
    this.unitPrice = "";
  }
}

export class PayWay {
  orderNumber: string;
  paymentAmount: string;
  paymentMode: string;

  constructor() {
    this.orderNumber = "";
    this.paymentAmount = "";
    this.paymentMode = "";
  }
}

export class Seller {
  address:string;
  businessName:string;
  emailAddress:string;
  legalName:string;
  linePhone:string;
  mobilePhone:string;
  ninBrn:string;
  referenceNo:string;
  tin:string;

  constructor() {
    this.address = "";
    this.businessName = "";
    this.emailAddress = "";
    this.legalName = "";
    this.linePhone = "";
    this.mobilePhone = "";
    this.ninBrn = "";
    this.referenceNo = "";
    this.tin = "";
  }
}

export class Summary {
  grossAmount:string
  itemCount:string
  modeCode:string
  netAmount:string
  qrCode:string
  remarks:string
  taxAmount:string

  constructor() {
    this.grossAmount = "";
    this.itemCount = "";
    this.modeCode = "";
    this.netAmount = "";
    this.qrCode = "";
    this.remarks = "";
    this.taxAmount = "";
  }
}

export class TaxDetails {
  exciseCurrency: string;
  exciseUnit: string;
  grossAmount: string;
  netAmount: string;
  taxAmount: string;
  taxCategory: string;
  taxRate: string;
  taxRateName: string;

  constructor() {
    this.exciseCurrency = "";
    this.exciseUnit = "";
    this.grossAmount = "";
    this.netAmount = "";
    this.taxAmount = "";
    this.taxCategory = "";
    this.taxRate = "";
    this.taxRateName = "";
  }
}

export class Extend {
  reason:string;
  reasonCode:string


  constructor() {
    this.reason = "";
    this.reasonCode = "";
  }
}

