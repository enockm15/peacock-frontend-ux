import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {InvoiceModel} from '../../../models/invoice-model';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ActivatedRoute} from '@angular/router';
import {InvoiceService} from '../../invoices/invoice.service';
import {CreditNoteModel} from '../../../models/credit-note-request-model';
import {CreditNoteService} from '../credit-note.service';

@Component({
  selector: 'app-view-credit-note',
  templateUrl: './view-credit-note.component.html',
  styleUrls: ['./view-credit-note.component.css']
})
export class ViewCreditNoteComponent implements OnInit {

  credit_note: CreditNoteModel = new CreditNoteModel();

  //Emitters
  $processing: EventEmitter<boolean> = new EventEmitter();
  $errorsEvent: EventEmitter<any> = new EventEmitter();
  $resultEvent: EventEmitter<any> = new EventEmitter();


  @ViewChild('approvedSwal', {static: false}) private approvedSwal: SwalComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: CreditNoteService
  ) { }

  ngOnInit(): void {
    this.$resultEvent.subscribe(result => {
      if (result.status.response_code === 'OK-0000') {
        this.credit_note = result.data[0].data_item;
      } else {
        this.approvedSwal.text = result.status.response_message;
        this.approvedSwal.icon = 'error';
        this.approvedSwal.title = 'ERROR';
        this.approvedSwal.fire().then();
      }
    });
    this.getById();
  }

  getById() {
    this.service.getCreditNoteByID(
      this.activatedRoute.snapshot.paramMap.get('creditNoteId'),
      this.$processing,
      this.$resultEvent,
      this.$errorsEvent
    );
  }
}
