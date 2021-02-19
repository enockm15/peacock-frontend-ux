import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditNoteRoutingModule } from './credit-note-routing.module';
import { CreateCreditNoteComponent } from './create-credit-note/create-credit-note.component';
import { FindCreditNoteComponent } from './find-credit-note/find-credit-note.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { ViewCreditNoteComponent } from './view-credit-note/view-credit-note.component';
import { CancelCreditNoteComponent } from './cancel-credit-note/cancel-credit-note.component';
import {QRCodeModule} from 'angular2-qrcode';


@NgModule({
  declarations: [CreateCreditNoteComponent, FindCreditNoteComponent, ViewCreditNoteComponent, CancelCreditNoteComponent],
  imports: [
    CommonModule,
    CreditNoteRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    _MatMenuDirectivesModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    SweetAlert2Module,
    MatPaginatorModule,
    MatCardModule,
    QRCodeModule

  ]
})
export class CreditNoteModule { }
