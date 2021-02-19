import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {DataServerError} from '../../../models/http-models';
import {ProductModel} from '../../../models/product-model';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-find-product',
  templateUrl: './find-product.component.html',
  styleUrls: ['./find-product.component.css']
})
export class FindProductComponent implements OnInit {
  isProcessing = false;
  isShowLoadMore = false;

  displayedColumns: string [] = ['code', 'description','category_name','category_code', 'item_count',  'actions*'];
  dataSource: MatTableDataSource<ProductModel>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatMenuTrigger, {static: true}) trigger: MatMenuTrigger;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  products: ProductModel[];

  // subscriptions
  subscriptions: Subscription[] = [];
  list = [];
  resultEvent: EventEmitter<any> = new EventEmitter();
  $processingEvent: EventEmitter<boolean> = new EventEmitter();
  $errorsEvent: EventEmitter<DataServerError[]> = new EventEmitter();

  constructor(
    private service: ProductService
  ) {

  }

  ngOnInit(): void {
    this.subscriptions['$processingEvent'] = this.$processingEvent.subscribe(
      isProcessing =>
        this.isProcessing = isProcessing
    );

    this.getProducts();
    this.resultEvent.subscribe(products => {
      if (products.status.response_code === 'OK-000') {
        this.products = products.data;
        this.dataSource = new MatTableDataSource<ProductModel>(this.products);
        this.dataSource.sort = this.sort;
        console.log(this.dataSource)
      }
    });

  }


  getProducts() {
    this.service.allProducts(this.$processingEvent, this.resultEvent, this.$errorsEvent);
  }

  loadMoreData() {
    // this.findDataRequest.page += 1;
    // this.refreshTableData(this.findDataRequest, false);
  }


}
