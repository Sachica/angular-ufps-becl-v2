import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
