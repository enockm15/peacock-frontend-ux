import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductItemsRoutingModule } from './product-items-routing.module';
import { FindProductItemComponent } from './find-product-item/find-product.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { StockFormComponent } from './stock-form/stock-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [FindProductItemComponent, StockFormComponent],
  imports: [
    CommonModule,
    ProductItemsRoutingModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    SweetAlert2Module,
    MatOptionModule,
    MatSelectModule,
  ]
})
export class ProductItemsModule { }
