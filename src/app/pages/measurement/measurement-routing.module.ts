import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FindMeasurementComponent} from './find-measurement/find-measurement.component';
import {EditMeasurementComponent} from './edit-measurement/edit-measurement.component';

const routes: Routes = [

  {
    path: "create",
    component: EditMeasurementComponent,
    data: {
      breadcrumb: "Add Unit",
      action: "CREATE"
    }
  },
  {
    path: ":unitId",
    component: EditMeasurementComponent,
    data: {
      breadcrumb: "",
      action: "VIEW"
    }
  },
  {
    path: "update/:unitId",
    component: EditMeasurementComponent,
    data: {
      breadcrumb: "",
      action: "EDIT"
    }
  },
  {
    path: "**",
    component: FindMeasurementComponent,
    data: {
      breadcrumb: "Units",
      action: "FIND"
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeasurementRoutingModule { }
