import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockersRoutingModule } from './lockers-routing.module';
import { ManageLockerComponent } from './pages/admin/manage-locker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LockersComponent } from './pages/staff/lockers/lockers.component'; 
import { MatSelectModule } from '@angular/material/select';
import { AudiComponent } from './pages/audi/audi.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  declarations: [
    ManageLockerComponent,
    LockersComponent,
    AudiComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatSelectModule,
    LockersRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableExporterModule,
  ]
})
export class LockersModule { }
