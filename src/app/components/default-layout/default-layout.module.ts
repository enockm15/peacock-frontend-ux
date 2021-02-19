import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterModule} from '../footer/footer.module';
import {NavigationModule} from '../navigation/navigation.module';
import {TopnavModule} from '../topnav/topnav.module';
import {RouterModule} from '@angular/router';
import {DefaultLayoutComponent} from './default-layout.component';
import {BreadcrumbMenuModule} from '../breadcrumb-menu/breadcrumb-menu.module';



@NgModule({
  declarations: [DefaultLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    FooterModule,
    NavigationModule,
    TopnavModule,
    BreadcrumbMenuModule
  ],
  exports: [
    DefaultLayoutComponent
  ]
})
export class DefaultLayoutModule { }
