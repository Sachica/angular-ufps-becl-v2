import { Component, OnInit } from '@angular/core';
import { User } from '@data/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public currentUser: User;

  constructor() {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null;
  }

  ngOnInit(): void {
  }

}
