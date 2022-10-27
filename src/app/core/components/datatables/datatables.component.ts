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
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
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

const ELEMENT_DATA: IUser[] = [
  {
    "id": 1,
    "username": "rojassachicadf@ufps.edu.co",
    "first_name": "DAVID FERNANDO",
    "last_name": "ROJAS SACHICA",
    "email": "rojassachicadf@ufps.edu.co",
    "picture": "https://lh3.googleusercontent.com/a-/AOh14GjpYHKKFClX9QzYg8fGKb1VD4-LuyoWveXsmXuj=s96-c",
    "is_active": true,
    "is_staff": false,
    "is_superuser": false,
    "program": {
      "id": 1,
      "name": "Ingenieria de Sistemas"
    },
    "roles": [
      {
        "id": 2,
        "name": "pregrado"
      }
    ]
  },
  {
    "id": 2,
    "username": "stiwardjherikofcr@ufps.edu.co",
    "first_name": "STIWARD JHERIKOF",
    "last_name": "CARRILLO RAMIREZ",
    "email": "stiwardjherikofcr@ufps.edu.co",
    "picture": "https://lh3.googleusercontent.com/a-/AOh14GiNUefxPNOtjcU0uq2BoP71S2HZ2zqR788-RZ6sSg=s96-c",
    "is_active": true,
    "is_staff": false,
    "is_superuser": false,
    "program": {
      "id": 1,
      "name": "Ingenieria de Sistemas"
    },
    "roles": [
      {
        "id": 1,
        "name": "staff"
      },
      {
        "id": 2,
        "name": "pregrado"
      }
    ]
  },
  {
    "id": 3,
    "username": "ronaldeduardobm@ufps.edu.co",
    "first_name": "RONALD  EDUARDO",
    "last_name": "BENITEZ MEJIA",
    "email": "ronaldeduardobm@ufps.edu.co",
    "picture": "https://lh3.googleusercontent.com/a-/AOh14GiELVSEScyM0fgmrxEkRCWXHIbGIlvyIKD0HdHxfQ=s96-c",
    "is_active": true,
    "is_staff": false,
    "is_superuser": false,
    "program": {
      "id": 1,
      "name": "Ingenieria de Sistemas"
    },
    "roles": [
      {
        "id": 1,
        "name": "staff"
      },
      {
        "id": 2,
        "name": "pregrado"
      }
    ]
  }
];
