import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { User } from '@data/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  public currentUser: User;

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService) {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null;
   }

  ngOnInit(): void {
  }

  public logOut(): void {
    this.socialAuthService.signOut();
    this.authService.logout();
    window.location.reload();
  }

}
