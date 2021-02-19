import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InvoiceService} from '../invoice.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {InvoiceModel} from '../../../models/invoice-model';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {

  invoice: InvoiceModel = new InvoiceModel();

  //Emitters
  $processing: EventEmitter<boolean> = new EventEmitter();
  $errorsEvent: EventEmitter<any> = new EventEmitter();
  $resultEvent: EventEmitter<any> = new EventEmitter();


  @ViewChild('approvedSwal', {static: false}) private approvedSwal: SwalComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: InvoiceService
  ) { }

  ngOnInit(): void {
    this.$resultEvent.subscribe(result => {
      if (result.status.response_code === 'OK-0000') {
       this.invoice = result.data[0].data_item;
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
    this.service.getInvoiceByID(
      this.activatedRoute.snapshot.paramMap.get('invoiceId'),
      this.$processing,
      this.$resultEvent,
      this.$errorsEvent
    );
  }

}
