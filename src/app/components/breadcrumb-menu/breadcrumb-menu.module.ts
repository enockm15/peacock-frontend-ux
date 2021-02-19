import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbMenuRoutingModule } from './breadcrumb-menu-routing.module';
import {RouterModule} from '@angular/router';
import {NavigationModule} from '../navigation/navigation.module';
import {BreadcrumbMenuComponent} from './breadcrumb-menu.component';


@NgModule({
  declarations: [BreadcrumbMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavigationModule,
    BreadcrumbMenuRoutingModule
  ],
  exports: [
    BreadcrumbMenuComponent
  ]
})
export class BreadcrumbMenuModule { }
