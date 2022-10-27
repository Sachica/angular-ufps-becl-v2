import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockersRoutingModule } from './lockers-routing.module';
import { CoreModule } from '@core/core.module';
import { ManageLockerComponent } from './pages/admin/manage-locker.component';


@NgModule({
  declarations: [
    ManageLockerComponent
  ],
  imports: [
    CommonModule,
    LockersRoutingModule,
    CoreModule
  ]
})
export class LockersModule { }
