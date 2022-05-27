import { OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '@modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit, OnDestroy {

  private sub: Subscription;
  private isPermission: boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.sub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route.snapshot),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
    ).subscribe((route: ActivatedRouteSnapshot) => {
      console.log(!!route.data['permission']);
      if (!!route.data['permission'] && this.authService.hasPermission(route.data['permission'])) {
        this.isPermission = true;
      }
    });
  }

  ngOnInit() {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(route, state);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      if (!this.isPermission) {
        this.router.navigateByUrl('/not-found/page-404');
        window.alert('You do not have permission to access this page');
        return false;
      }
      return true;
    }
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
