import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {InvoiceModel} from '../../models/invoice-model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {InvoiceService} from './invoice.service';
import {catchError, finalize} from 'rxjs/operators';

export class InvoiceDataSource implements DataSource<InvoiceModel> {

  private invoiceSubject = new BehaviorSubject<InvoiceModel[]>([]);
  private invoicingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.invoicingSubject.asObservable();

  constructor(private service: InvoiceService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<InvoiceModel[]> {
    return this.invoiceSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.invoiceSubject.complete();
    this.invoicingSubject.complete();
  }

  loadInvoices(invoiceId:any, filter:string,sortDirection:String ,pageIndex:number,pageSize:number) {
    this.invoicingSubject.next(true);
    this.service.findInvoices().pipe(
      catchError(() => of([])),
      finalize(() => this.invoicingSubject.next(false))
    ).subscribe(invoices => this.invoiceSubject.next(invoices));
  }

}
