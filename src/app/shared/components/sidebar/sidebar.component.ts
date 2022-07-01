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
  public isCarnetsEnabled: boolean = false;

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.isCarnetsEnabled = this.authService.checkPermission('reader_qr_entrance') || this.authService.checkPermission('reader_qr_exit');
    this.currentUser = this.userService.currentUser;
  }

  public logOut(): void {
    this.socialAuthService.signOut();
    this.authService.logout();
    window.location.reload();
  }

}
