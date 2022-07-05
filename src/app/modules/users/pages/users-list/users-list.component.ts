import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { IUser } from '@data/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = ['id', 'picture', 'first_name', 'last_name', 'email', 'is_active', 'program', 'actions'];
  public dataSource: MatTableDataSource<IUser>;
  private unsubscribe$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.usersService.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        let users: IUser[] = data.map(
          ({ id, username, first_name, last_name, email, picture, is_active, is_staff, is_superuser, program, groups, user_permissions }: IUser) => {
            return {
              id,
              username,
              first_name,
              last_name,
              email,
              picture,
              is_active,
              is_staff,
              is_superuser,
              program,
              groups,
              user_permissions
            };
          });
        console.log({ users });
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
