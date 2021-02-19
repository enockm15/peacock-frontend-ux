import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FindInvoiceComponent} from './find-invoice/find-invoice.component';
import {EditInvoiceComponent} from './edit-invoice/edit-invoice.component';

const routes: Routes = [
  {
    path: ":invoiceId",
    component:EditInvoiceComponent,
    data: {
      breadcrumb: "",
      action: "VIEW"
    }
  },
  {
    path: "**",
    component: FindInvoiceComponent,
    data: {
      breadcrumb: "Invoices",
      action: "FIND"
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
