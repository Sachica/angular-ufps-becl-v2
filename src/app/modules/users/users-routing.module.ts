import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from '@layouts/admin-layout/admin-layout.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { RolGuard } from '@core/guards/rol.guard';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'users-list',
        component: UsersListComponent,
        canActivate: [RolGuard],
        data: { title: 'Users List', rol: 'ADMIN' }
      },
      {
        path: 'user-detail/:id',
        component: UserEditComponent,
        canActivate: [RolGuard],
        data: { title: 'User Detail', rol: 'ADMIN' }
      },
      {
        path: '**',
        redirectTo: 'users-list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
