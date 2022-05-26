import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = `${environment.baseUrlAuth}sign_in/`;
  public currentUser: BehaviorSubject<any>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.currentUser = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || '{}'));
  }

  public signIn(data: any): Observable<any> {
    return this.http.post<any>(this.URL, JSON.stringify(data)).pipe(
      tap((res: any) => {
        this.cookieService.set('access_token', res.access, new Date(this.getDecodedAccessToken(res.access).exp * 1000), '/');
        this.cookieService.set('refresh_token', res.refresh, new Date(this.getDecodedAccessToken(res.refresh).exp * 1000), '/');
        //this.currentUser = this.getDecodedAccessToken(res.access).user;
        this.setUserToLocalStorage(this.currentUser);
        this.currentUser.next(this.getDecodedAccessToken(res.access).user);
      }),
      catchError(this.handleError));
  }

  public isLoggedIn(): boolean {
    return this.cookieService.check('access_token');
  }

  public logout(): void {
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }

  public getDecodedAccessToken(token: string): any {
    try {
      return JSON.parse(window.atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  public getCurrentUser(): any {
    return this.currentUser.value;
  }

  public getUserToLocalStorage(): void {
    this.currentUser.next(JSON.parse(localStorage.getItem('user')!));
  }

  public setUserToLocalStorage(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public hasAccessToModule(permission: string): boolean {
    const user = this.getCurrentUser();
    return user.permissions.includes(permission);
  }

  public handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

}
