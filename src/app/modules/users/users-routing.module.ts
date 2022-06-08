import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from '@layouts/admin-layout/admin-layout.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { AuthGuard } from '@core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'users-list',
        component: UsersListComponent,
        canActivate: [AuthGuard],
        data: { title: 'Users List', permission: 'listUsers' },
      },
      {
        path: 'user-detail/:id',
        component: UserEditComponent,
        canActivate: [AuthGuard],
        data: { title: 'User Detail', permission: 'detailUser' },
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
