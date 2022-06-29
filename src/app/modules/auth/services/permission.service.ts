import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { AuthService } from '@modules/auth/services/auth.service';
import { IPermission } from '@data/interfaces';
import { User } from '@data/models';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private permissions: IPermission[];

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe((user: User) => {
      this.permissions = user.user_permissions;
      console.table(this.permissions);
    });
  }

  public hasPermission(component: any): boolean {
    return this.checkPermission(component.data.permission);
  }

  private checkPermission(permission: string): boolean {
    return this.permissions.some(p => p.codename === permission);
  }

}
