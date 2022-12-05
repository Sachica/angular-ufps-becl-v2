import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@modules/auth/services/auth.service';
import { RolService } from '@modules/auth/services/rol.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private rolService: RolService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRol(next, state);
  }

  checkRol(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.rolService.hasRol(next)) return true;
    this.router.navigateByUrl('/not-found/page-401');
    return false;
  }

}
