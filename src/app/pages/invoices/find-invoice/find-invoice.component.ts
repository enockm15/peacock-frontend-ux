import {AfterViewInit, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatSort} from '@angular/material/sort';
import {InvoiceModel} from '../../../models/invoice-model';
import {Subscription} from 'rxjs';
import {DataServerError} from '../../../models/http-models';
import {InvoiceService} from '../invoice.service';

@Component({
  selector: 'app-find-invoice',
  templateUrl: './find-invoice.component.html',
  styleUrls: ['./find-invoice.component.css']
})
export class FindInvoiceComponent implements OnInit {
  isProcessing = false;
  isShowLoadMore = false;

  displayedColumns: string [] = ['fdn', 'businessName', 'netAmount', 'taxAmount', 'item_count', 'status', 'issueDate', 'actions*'];
  dataSource: MatTableDataSource<InvoiceModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatMenuTrigger, {static: true}) trigger: MatMenuTrigger;
  @ViewChild(MatSort) sort: MatSort;

  invoices: InvoiceModel[];

  // subscriptions
  subscriptions: Subscription[] = [];
  list = [];
  resultEvent: EventEmitter<any> = new EventEmitter();
  $processingEvent: EventEmitter<boolean> = new EventEmitter();
  $errorsEvent: EventEmitter<DataServerError[]> = new EventEmitter();

  constructor(
    private service: InvoiceService
  ) {
    this.subscriptions['$processingEvent'] = this.$processingEvent.subscribe(
      isProcessing =>
        this.isProcessing = isProcessing
    );

    this.getProducts();

    this.resultEvent.subscribe(invoices => {
      if (invoices.status.response_code === 'OK-000') {
        this.invoices = invoices.data;
        this.dataSource = new MatTableDataSource<InvoiceModel>(this.invoices);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });

  }


  ngOnInit(): void {

  }

  ngAfterViewInit() {

    // this.dataSource.sort = this.sort;
  }

  getProducts() {
    this.service.allInvoices(this.$processingEvent, this.resultEvent, this.$errorsEvent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
