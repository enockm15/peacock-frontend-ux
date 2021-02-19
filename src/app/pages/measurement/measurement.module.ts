import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeasurementRoutingModule } from './measurement-routing.module';
import { EditMeasurementComponent } from './edit-measurement/edit-measurement.component';
import { FindMeasurementComponent } from './find-measurement/find-measurement.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [EditMeasurementComponent, FindMeasurementComponent],
  imports: [
    CommonModule,
    MeasurementRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    _MatMenuDirectivesModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    SweetAlert2Module
  ]
})
export class MeasurementModule { }
