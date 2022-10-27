import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { AuthService } from '@modules/auth/services/auth.service';
import { IRol } from '@data/interfaces';
import { User } from '@data/models';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private roles: IRol[];

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe((user: User) => {
      this.roles = user.roles;
    });
  }

  public hasRol(component: any): boolean {
    return this.checkRol(component.data.rol);
  }

  private checkRol(rol: string): boolean {
    return this.roles.some(p => p.name === rol);
  }

}
