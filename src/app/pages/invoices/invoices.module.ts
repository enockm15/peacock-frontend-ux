import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { FindInvoiceComponent } from './find-invoice/find-invoice.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { QRCodeModule } from 'angular2-qrcode';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [FindInvoiceComponent, EditInvoiceComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SweetAlert2Module,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    _MatMenuDirectivesModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    QRCodeModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class InvoicesModule { }
