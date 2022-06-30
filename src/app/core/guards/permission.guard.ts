import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@modules/auth/services/auth.service';
import { PermissionService } from '@modules/auth/services/permission.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private permissionService: PermissionService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkPermission(next, state);
  }

  checkPermission(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.permissionService.hasPermission(next)) return true;
    this.authService.logout();
    this.router.navigateByUrl('/not-found/page-404');
    return false;
  }

}
