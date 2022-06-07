import { Component, OnInit } from '@angular/core';
import { User } from '@data/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public currentUser: User;

  constructor() {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null;
   }

  ngOnInit(): void {
  }

}
