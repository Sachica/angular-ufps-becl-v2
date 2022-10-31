import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolGuard } from '@core/guards/rol.guard';
import { AdminLayoutComponent } from '@layouts/admin-layout/admin-layout.component';
import { ManageLockerComponent } from './pages/admin/manage-locker.component';
import { LockersComponent} from './pages/staff/lockers/lockers.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'manage-lockers',
        component: ManageLockerComponent,
        canActivate: [RolGuard],
        data: { title: 'Administrar Lockers', rol: 'ADMIN' }
      },
      {
        path: 'lockers',
        component: LockersComponent,
        canActivate: [RolGuard],
        data: { title: 'Lockers', rol: 'LOCKER' }
      },
      {
        path: '**',
        redirectTo: 'manage-lockers',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockersRoutingModule { }
