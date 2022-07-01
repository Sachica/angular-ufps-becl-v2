import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from '@layouts/admin-layout/admin-layout.component';
import { QrInputComponent } from './pages/qr-input/qr-input.component';
import { QrOutputComponent } from './pages/qr-output/qr-output.component';
import { PermissionGuard } from '@core/guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'qr-input',
        component: QrInputComponent,
        canActivate: [PermissionGuard],
        data: { title: 'QR Input', permission: 'reader_qr_entrance' }
      },
      {
        path: 'qr-output',
        component: QrOutputComponent,
        canActivate: [PermissionGuard],
        data: { title: 'QR Output', permission: 'reader_qr_exit' }
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
