import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

import { CoreModule } from '@core/core.module';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  declarations: [
    UsersListComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CoreModule,
    MatTableExporterModule,
  ]
})
export class UsersModule { }
