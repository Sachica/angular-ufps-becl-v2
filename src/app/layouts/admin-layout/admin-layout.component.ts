import { Component, OnInit } from '@angular/core';
import { SidebarService } from '@core/services/sidebar.service';
import { ISidebar } from '@data/interfaces';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styles: [
  ]
})
export class AdminLayoutComponent implements OnInit {

  public menuItems: ISidebar[];

  constructor(private sidebarService: SidebarService) {
    this.menuItems = this.sidebarService.menu;
  }

  ngOnInit(): void {
  }

}
