import { Component, OnInit } from '@angular/core';

import { UserService } from '@core/services/user.service';
import { User } from '@data/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public currentUser: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
  }

}
