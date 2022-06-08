import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isLoggedIn = this.authService.isLoggedIn();
    const token = this.cookieService.get('access_token');
    const headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });

    if (!isLoggedIn) {
      request = request.clone({ headers });
    } else {
      request = request.clone({ headers: headers.append('Authorization', `Bearer ${token}`) });
    }

    return next.handle(request);
  }

}
