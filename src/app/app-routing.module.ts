import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultLayoutComponent} from './components/default-layout/default-layout.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  { path:'', redirectTo:'/auth', pathMatch:'full' },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'measurements',
        loadChildren: () => import('./pages/measurement/measurement.module').then(m => m.MeasurementModule),
        data: {
          breadcrumb: 'Units of Measurements',
          label: 'UnitsOfMeasurements'
        }
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
        data: {
          breadcrumb: 'Products',
          label: 'Products'
        }
      },
      {
        path: 'productItems',
        loadChildren: () => import('./pages/product-items/product-items.module').then(m => m.ProductItemsModule),
        data: {
          breadcrumb: 'Product Items',
          label: 'Product Items'
        }
      },
      {
        path: 'invoices',
        loadChildren: () => import('./pages/invoices/invoices.module').then(m => m.InvoicesModule),
        data: {
          breadcrumb: 'Invoices',
          label: 'Invoices'
        }
      },
      {
        path: 'credit-notes',
        loadChildren: () => import('./pages/credit-note/credit-note.module').then(m => m.CreditNoteModule),
        data: {
          breadcrumb: 'CreditNote',
          label: 'CreditNote'
        }
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes,{ useHash: true }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
