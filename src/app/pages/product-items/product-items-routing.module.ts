import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FindProductItemComponent} from './find-product-item/find-product.component';

const routes: Routes = [
  {
    path: "**",
    component: FindProductItemComponent,
    data: {
      breadcrumb: "Product Items",
      action: "FIND"
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductItemsRoutingModule { }
