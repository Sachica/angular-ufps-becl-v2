import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { User } from '@data/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public currentUser: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
      this.currentUser.picture = this.currentUser.picture || 'assets/img/profile.jpg';
    });
  }

}
