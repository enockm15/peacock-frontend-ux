import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ProductItemModel} from '../../../models/product-model';
import {MatPaginator} from '@angular/material/paginator';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {DataServerError} from '../../../models/http-models';
import {ProductItemService} from '../product-item.service';
import {StockFormComponent} from '../stock-form/stock-form.component';
import {MatDialog} from '@angular/material/dialog';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-find-product',
  templateUrl: './find-product.component.html',
  styleUrls: ['./find-product.component.css']
})
export class FindProductItemComponent implements OnInit {

  isProcessing = false;
  isShowLoadMore = false;

  displayedColumns: string [] = ['product_code','product_name', 'product_item_code', 'unit_price', 'category_code','quantity','category_name','status','created_at', 'actions*'];
  dataSource: MatTableDataSource<ProductItemModel>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatMenuTrigger, {static: true}) trigger: MatMenuTrigger;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('approvedSwal', {static: false}) private approvedSwal: SwalComponent;

  productItems: ProductItemModel[];

  // subscriptions
  subscriptions: Subscription[] = [];
  //arrays
  list = [];
  resultEvent: EventEmitter<any> = new EventEmitter();
  efrisResultEvent: EventEmitter<any> = new EventEmitter();
  $processingEvent: EventEmitter<boolean> = new EventEmitter();
  $errorsEvent: EventEmitter<DataServerError[]> = new EventEmitter();

  constructor(
    private service: ProductItemService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.subscriptions['$processingEvent'] = this.$processingEvent.subscribe(
      isProcessing =>
        this.isProcessing = isProcessing
    );

    this.getProductItems();

    this.resultEvent.subscribe(items => {
      if (items.status.response_code === 'OK-000') {
        this.productItems = items.data;
        this.dataSource = new MatTableDataSource<ProductItemModel>(this.productItems);
        this.dataSource.sort = this.sort;
        console.log(this.dataSource)
      }
    });

    // TODO:: Add SweatAlert
    this.efrisResultEvent.subscribe(result => {
      if (result.status.response_code === 'OK-0000') {
        this.approvedSwal.text = result.status.additional_details;
        this.approvedSwal.icon = 'success';
        this.approvedSwal.title = 'SUCCESS';
        this.approvedSwal.fire().then()
      } else {
        this.approvedSwal.text = result.status.response_message;
        this.approvedSwal.icon = 'error';
        this.approvedSwal.title = 'ERROR';
        this.approvedSwal.fire().then();
      }
    })



  }

  openDialog(item:ProductItemModel): void {
    console.log(item);
    const dialogRef = this.dialog.open(StockFormComponent, {
      width: '450px',
      data: item
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log("Dialog output:" + result.text
      )
      }
    );
  }

  pushItemToEfris(productItem:any) {
    this.service.postToEfris(productItem,this.$processingEvent,this.efrisResultEvent,this.$errorsEvent);
  }


  getProductItems() {
    this.service.allProductItems(this.$processingEvent, this.resultEvent, this.$errorsEvent);
  }

  loadMoreData() {
    // this.findDataRequest.page += 1;
    // this.refreshTableData(this.findDataRequest, false);
  }


}
