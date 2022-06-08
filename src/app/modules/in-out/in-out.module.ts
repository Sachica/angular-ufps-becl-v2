import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InOutRoutingModule } from './in-out-routing.module';
import { QrInputComponent } from './pages/qr-input/qr-input.component';
import { QrOutputComponent } from './pages/qr-output/qr-output.component';


@NgModule({
  declarations: [
    QrInputComponent,
    QrOutputComponent
  ],
  imports: [
    CommonModule,
    InOutRoutingModule
  ]
})
export class InOutModule { }
