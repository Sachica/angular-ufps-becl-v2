import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '@modules/auth/services/auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { UserService } from '@core/services/user.service';
import { User } from '@data/models';
import { ROLE } from '@data/enums/role.enum';
import { ISidebar } from '@data/interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ['a { cursor: pointer; }']
})
export class SidebarComponent implements OnInit {

  @Input() menuItems!: ISidebar[];
  public currentUser: User;
  public isCarnetsEnabled: boolean = false;

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService
  ) { }


  public hasRole(roles: ROLE[]): boolean {
    if (!roles) return true;
    return this.authService.checkRol(roles);
  }

  ngOnInit(): void {
    this.isCarnetsEnabled = this.authService.checkRol([ROLE.QR_ENTRANCE]) || this.authService.checkRol([ROLE.QR_EXIT]);
    this.currentUser = this.authService.getCurrentUserSubject();
  }

  public logOut(): void {
    this.socialAuthService.signOut();
    this.authService.logout();
    window.location.reload();
  }

}
