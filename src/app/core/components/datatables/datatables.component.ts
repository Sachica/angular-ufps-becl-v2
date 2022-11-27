import { Component, Input, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';

import { IUser } from '@data/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-datatables',
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.css']
})
export class DatatablesComponent implements OnInit, AfterViewInit {

  @Input() data: IUser[];
  @Input() columns: string[];

  displayedColumns: string[];
  dataSource: MatTableDataSource<IUser>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.displayedColumns = ['id', 'picture', 'first_name', 'last_name', 'email', 'is_active', 'is_staff', 'actions'];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.dataSource.filter = '';
  }

}