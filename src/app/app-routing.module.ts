import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';
import { NoAuthGuard } from '@core/guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('@modules/home/home.module').then((m) => m.HomeModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('@modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('@modules/account/account.module').then((m) => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'lockers',
    loadChildren: () => import('@modules/lockers/lockers.module').then((m) => m.LockersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'in-out',
    loadChildren: () => import('@modules/in-out/in-out.module').then((m) => m.InOutModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('@modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('@modules/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'not-found',
    loadChildren: () => import('@modules/not-pages-found/not-pages-found.module').then((m) => m.NotPagesFoundModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    enableTracing: false,
    preloadingStrategy: PreloadAllModules
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
