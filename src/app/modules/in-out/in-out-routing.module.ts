import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from '@layouts/admin-layout/admin-layout.component';
import { QrInputComponent } from './pages/qr-input/qr-input.component';
import { QrOutputComponent } from './pages/qr-output/qr-output.component';
import { AudiComponent } from './pages/audi/audi.component';
import { RolGuard } from '@core/guards/rol.guard';
import { ROLE } from '@data/enums/role.enum';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'qr-input',
        component: QrInputComponent,
        canActivate: [RolGuard],
        data: { title: 'QR Input', rol: ROLE.QR_ENTRANCE }
      },
      {
        path: 'qr-output',
        component: QrOutputComponent,
        canActivate: [RolGuard],
        data: { title: 'QR Output', rol: ROLE.QR_EXIT }
      },
      {
        path: 'audi-in-out',
        component: AudiComponent,
        canActivate: [RolGuard],
        data: { title: 'QR Output', rol: ROLE.ADMIN }
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
