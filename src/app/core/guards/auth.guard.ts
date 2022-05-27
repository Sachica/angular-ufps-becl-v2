import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, activatedRoute: ActivatedRoute) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log(activatedRoute.snapshot.firstChild!.data);
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(route, state);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      if (route.data['permission'] && !this.authService.hasAccessToModule(route.data['permission'])) {
        this.router.navigateByUrl('/not-found/page-404');
        return false;
      }
      return true;
    }
    console.log(route.data['permission']);
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
