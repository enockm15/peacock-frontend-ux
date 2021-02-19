import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {CreditNoteReason, CreditNoteRequestModel} from '../../../models/credit-note-request-model';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {CreditNoteService} from '../credit-note.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-credit-note',
  templateUrl: './create-credit-note.component.html',
  styleUrls: ['./create-credit-note.component.css']
})
export class CreateCreditNoteComponent implements OnInit {


  creditNote: CreditNoteRequestModel = new CreditNoteRequestModel();

  //Emitters
  $processing: EventEmitter<boolean> = new EventEmitter();
  $errorsEvent: EventEmitter<any> = new EventEmitter();
  $resultEvent: EventEmitter<any> = new EventEmitter();

  // Boolean
  isFormValid = false;

  reasonType: any[] = [];

  action: string = '';

  @ViewChild('approvedSwal', {static: false}) private approvedSwal: SwalComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: CreditNoteService,
    private router: Router,
    private fb: FormBuilder,
  ) {

  }
  creditNoteForm: FormGroup = this.fb.group({
    reason: ['', Validators.compose([Validators.required])],
    reason_code: ['', Validators.compose([Validators.required])],
    // remarks:  ['', Validators.compose([Validators.required])],
  });

  get formControl() {
    return this.creditNoteForm.controls;

  }


  mapCreditNoteFormData() {
    if (this.validateApplicationForm()) {
      this.isFormValid = true;
      this.creditNote.invoiceId =   this.activatedRoute.snapshot.paramMap.get('invoiceId');
      this.creditNote.reason = this.formControl.reason.value;
      this.creditNote.reason_code = this.formControl.reason_code.value.key;
    } else {
      this.isFormValid = false;
    }
  }

  validateApplicationForm(): boolean {
    return (
      (this.creditNoteForm.valid && this.creditNoteForm.touched) ||
      this.creditNoteForm.status === 'DISABLED'
    );
  }

  resetForm() {
    this.creditNoteForm.reset();
    this.creditNoteForm.markAsUntouched();
    this.creditNoteForm.markAsPristine();
  }



  ngOnInit(): void {
    this.$resultEvent.subscribe(result => {
      if (result.status.response_code === 'OK-0000') {
        this.resetForm();
        this.approvedSwal.text = result.status.response_message;
        this.approvedSwal.icon = 'success';
        this.approvedSwal.title = 'SUCCESS';
        this.approvedSwal.fire().then();
      } else {
        this.approvedSwal.text = result.status.response_message;
        this.approvedSwal.icon = 'error';
        this.approvedSwal.title = 'ERROR';
        this.approvedSwal.fire().then();
      }
    });

    this.reasonType = Object.entries(CreditNoteReason)
      .map(([key, value]) => ({key: key, value: value}));
  }

  submitCase() {
    this.mapCreditNoteFormData();
    if (this.isFormValid) {
      console.log(this.creditNote)
      this.service.createCreditNote(this.creditNote, this.$processing, this.$resultEvent, this.$errorsEvent);
    }
  }


}


