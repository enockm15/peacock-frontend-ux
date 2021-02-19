import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DefaultLayoutModule} from './components/default-layout/default-layout.module';
import { MeasurementComponent } from './pages/measurement/measurement.component';
import { AuthComponent } from './pages/auth/auth.component';
import {AuthModule} from './pages/auth/auth.module';
import {HttpClientModule} from '@angular/common/http';
import {MeasurementModule} from './pages/measurement/measurement.module';
import {AuthRoutingModule} from './pages/auth/auth-routing.module';
import {MeasurementRoutingModule} from './pages/measurement/measurement-routing.module';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { ProductComponent } from './pages/product/product.component';
import { ProductItemsComponent } from './pages/product-items/product-items.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { CreditNoteComponent } from './pages/credit-note/credit-note.component';

@NgModule({
  declarations: [
    AppComponent,
    MeasurementComponent,
    AuthComponent,
    ProductComponent,
    ProductItemsComponent,
    InvoicesComponent,
    CreditNoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultLayoutModule,
    AuthModule,
    AuthRoutingModule,
    MeasurementModule,
    MeasurementRoutingModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
