import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './pages/page404/page404.component';
import { Page500Component } from './pages/page500/page500.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'page-404', component: Page404Component, data: { title: 'Page 404' } },
      { path: 'page-500', component: Page500Component, data: { title: 'Page 500' } },
      { path: '**', redirectTo: '/page-404' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotPagesFoundRoutingModule { }
