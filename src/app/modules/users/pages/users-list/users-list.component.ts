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
  public columns: string[] = ['id', 'username', 'first_name', 'last_name', 'email', 'picture', 'is_active', 'is_staff', 'is_superuser'];
  private unsubscribe$ = new Subject<void>();

  constructor(private usersService: UsersService) {
    this.getUsers();
  }

  ngOnInit(): void { }

  public getUsers(): void {
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
          });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
