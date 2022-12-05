import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InOutRoutingModule } from './in-out-routing.module';
import { QrInputComponent } from './pages/qr-input/qr-input.component';
import { QrOutputComponent } from './pages/qr-output/qr-output.component';
import { CoreModule } from '@core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AudiComponent } from './pages/audi/audi.component';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '@shared/shared.module';
import { MatTableExporterModule } from 'mat-table-exporter';


@NgModule({
  declarations: [
    QrInputComponent,
    QrOutputComponent,
    AudiComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatSelectModule,
    InOutRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    SharedModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableExporterModule,
  ]
})
export class InOutModule { }
