import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {DataServerError} from '../../../models/http-models';
import {CreditNoteModel} from '../../../models/credit-note-request-model';
import {CreditNoteService} from '../credit-note.service';

@Component({
  selector: 'app-find-credit-note',
  templateUrl: './find-credit-note.component.html',
  styleUrls: ['./find-credit-note.component.css']
})
export class FindCreditNoteComponent implements OnInit {

  isProcessing = false;
  isShowLoadMore = false;

  displayedColumns: string [] = ['fdn', 'invoice_id','reference_no', 'reason_code', 'response_code', 'response_message', 'status', 'issueDate', 'actions*'];
  dataSource: MatTableDataSource<CreditNoteModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatMenuTrigger, {static: true}) trigger: MatMenuTrigger;
  @ViewChild(MatSort) sort: MatSort;

  credit_notes: CreditNoteModel[];

  // subscriptions
  subscriptions: Subscription[] = [];
  list = [];
  resultEvent: EventEmitter<any> = new EventEmitter();
  $processingEvent: EventEmitter<boolean> = new EventEmitter();
  $errorsEvent: EventEmitter<DataServerError[]> = new EventEmitter();

  constructor(
    private service: CreditNoteService
  ) {
    this.subscriptions['$processingEvent'] = this.$processingEvent.subscribe(
      isProcessing =>
        this.isProcessing = isProcessing
    );

    this.getProducts();

    this.resultEvent.subscribe(credit_notes => {
      if (credit_notes.status.response_code === 'OK-000') {
        this.credit_notes = credit_notes.data;
        this.dataSource = new MatTableDataSource<CreditNoteModel>(this.credit_notes);
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
    this.service.allCreditNotes(this.$processingEvent, this.resultEvent, this.$errorsEvent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
