import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {CreditNoteCancelModel, CreditNoteReason, CreditNoteRequestModel} from '../../../models/credit-note-request-model';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {CreditNoteService} from '../credit-note.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cancel-credit-note',
  templateUrl: './cancel-credit-note.component.html',
  styleUrls: ['./cancel-credit-note.component.css']
})
export class CancelCreditNoteComponent implements OnInit {


  creditNote: CreditNoteCancelModel = new CreditNoteCancelModel();

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
    reason_code: ['', Validators.compose([Validators.required])],
    reason: [{value:'',disabled: true}, Validators.compose([Validators.required])],
  });

  get formControl() {
    return this.creditNoteForm.controls;

  }


  mapCreditNoteFormData() {
    if (this.validateApplicationForm()) {
      this.isFormValid = true;
      this.creditNote.invoiceNo =   this.activatedRoute.snapshot.paramMap.get('creditNoteNO');
      this.creditNote.reason = this.formControl.reason.value;
      this.creditNote.reasonCode = this.formControl.reason_code.value.key;
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

  reasonSelected() {
    let selected = this.creditNoteForm.get('reason_code').value;
    if (selected.value === '105') {
      this.creditNoteForm.get('reason').enable();
    } else
      this.creditNoteForm.get('reason').disable();
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
      this.service.cancelCreditNote(this.creditNote, this.$processing, this.$resultEvent, this.$errorsEvent);
    }
  }

}
