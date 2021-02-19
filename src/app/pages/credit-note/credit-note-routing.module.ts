import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateCreditNoteComponent} from './create-credit-note/create-credit-note.component';
import {FindCreditNoteComponent} from './find-credit-note/find-credit-note.component';
import {ViewCreditNoteComponent} from './view-credit-note/view-credit-note.component';
import {CancelCreditNoteComponent} from './cancel-credit-note/cancel-credit-note.component';

const routes: Routes = [
  {
    path: "create/:invoiceId",
    component:CreateCreditNoteComponent,
    data: {
      breadcrumb: "",
      action: "CREATE"
    }
  },
  {
    path: "view/:creditNoteId",
    component: ViewCreditNoteComponent,
    data: {
      breadcrumb: "",
      action: "VIEW"
    }
  },
  {
    path: "cancel/:creditNoteNO",
    component: CancelCreditNoteComponent,
    data: {
      breadcrumb: "",
      action: "CANCEL"
    }
  },

  {
    path: "**",
    component: FindCreditNoteComponent,
    data: {
      breadcrumb: "Credit Notes",
      action: "FIND"
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditNoteRoutingModule { }
