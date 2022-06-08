import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from '@layouts/admin-layout/admin-layout.component';
import { QrInputComponent } from './pages/qr-input/qr-input.component';
import { QrOutputComponent } from './pages/qr-output/qr-output.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'qr-input',
        component: QrInputComponent,
        data: { title: 'Profile' }
      },
      {
        path: 'qr-output',
        component: QrOutputComponent,
        data: { title: 'Settings' }
      },
      {
        path: '**',
        redirectTo: 'qr-input',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InOutRoutingModule { }
