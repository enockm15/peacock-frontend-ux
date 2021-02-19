import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FindProductComponent } from './find-product/find-product.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ProductItemComponent } from './product-item/product-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [EditProductComponent, FindProductComponent, ProductItemComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatTooltipModule
  ]
})
export class ProductModule { }
