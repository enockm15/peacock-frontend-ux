import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditProductComponent} from './edit-product/edit-product.component';
import {FindProductComponent} from './find-product/find-product.component';

const routes: Routes = [
  {
    path: "create",
    component: EditProductComponent,
    data: {
      breadcrumb: "Add Product",
      action: "CREATE"
    }
  },
  {
    path: ":productId",
    component: EditProductComponent,
    data: {
      breadcrumb: "",
      action: "VIEW"
    }
  },
  {
    path: "update/:productId",
    component: EditProductComponent,
    data: {
      breadcrumb: "",
      action: "EDIT"
    }
  },
  {
    path: "**",
    component: FindProductComponent,
    data: {
      breadcrumb: "Products",
      action: "FIND"
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
