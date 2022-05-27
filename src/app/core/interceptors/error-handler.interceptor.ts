import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if ([401, 403, 404].indexOf(error.status) !== -1) {
          this.authService.logout();
          this.router.navigateByUrl('/not-found/page-404' + error.status);
        }
        return throwError(() => error);
      })
    );
  }
}