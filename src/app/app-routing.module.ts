import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('@modules/auth/auth.module').then((m) => m.AuthModule) },
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
  { path: 'not-found', loadChildren: () => import('@modules/not-pages-found/not-pages-found.module').then((m) => m.NotPagesFoundModule) },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
