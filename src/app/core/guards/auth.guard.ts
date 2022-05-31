import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '@modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //private data: any;
  //private isPermission: boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(route, state);
  }


  /*permissionCheck(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route.snapshot),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
    ).subscribe((route: ActivatedRouteSnapshot) => {
      this.data = route.data;
      if (!!this.data.permission) {
        if (this.authService.hasPermission(this.data.permission)) {
          this.isPermission = true;
        }
      } else {
        this.isPermission = true;
      }
    });
  }*/


  checkUserLogin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const isPermission: boolean = !!this.authService.getDataToLocalStorage().permission;
    const isPermissionCheck: boolean = isPermission ? this.authService.hasPermission(this.authService.getDataToLocalStorage().permission) : true;
    if (isLoggedIn) {
      if (!isPermissionCheck) {
        this.authService.logout();
        this.router.navigateByUrl('/not-found/page-404');
        return false;
      }
      return true;
    }
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
