import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from '@env/environment.development';
import { RolesDirective } from './directives/roles.directive';
import { CapitalizePipe } from './pipes';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    RolesDirective,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    CapitalizePipe
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId)
          }
        ]
      } as SocialAuthServiceConfig
    }
  ]
})
export class SharedModule { }
