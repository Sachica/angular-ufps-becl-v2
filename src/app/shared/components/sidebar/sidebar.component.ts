import { Component, OnInit } from '@angular/core';

import { AuthService } from '@modules/auth/services/auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { UserService } from '@core/services/user.service';
import { User } from '@data/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public currentUser: User;

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
  }

  public isCarnets(): boolean {
    return this.authService.checkPermission('qr-input') || this.authService.checkPermission('qr-output');
  }

  public logOut(): void {
    this.socialAuthService.signOut();
    this.authService.logout();
    window.location.reload();
  }

}
