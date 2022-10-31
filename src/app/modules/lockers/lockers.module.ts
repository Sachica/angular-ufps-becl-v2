import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockersRoutingModule } from './lockers-routing.module';
import { CoreModule } from '@core/core.module';
import { ManageLockerComponent } from './pages/admin/manage-locker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LockersComponent } from './pages/staff/lockers/lockers.component'; 
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ManageLockerComponent,
    LockersComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatSelectModule,
    LockersRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class LockersModule { }
