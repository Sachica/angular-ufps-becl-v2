import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from '@layouts/admin-layout/admin-layout.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { PermissionGuard } from '@core/guards/permission.guard';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'users-list',
        component: UsersListComponent,
        canActivate: [PermissionGuard],
        data: { title: 'Users List', permission: 'user_list' }
      },
      {
        path: 'user-detail/:id',
        component: UserEditComponent,
        canActivate: [PermissionGuard],
        data: { title: 'User Detail', permission: 'user_edit' }
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
