import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { UsersService } from '@modules/users/services/users.service';
import { IUser } from '@data/interfaces';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {

  public users: IUser[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.usersService.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.users = data.map(
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
          }
        );
        console.table(this.users);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
