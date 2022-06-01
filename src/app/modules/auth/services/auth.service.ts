import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@env/environment';
import { IAccessToken, IToken, ITokenDto, IPermission } from '@data/interfaces';
import { User } from '@data/models';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = `${environment.ngrokUrlAuth}sign_in/`;
  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>
  private helper: JwtHelperService;
  private token: IAccessToken = {} as IAccessToken;
  private permission: IPermission;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.helper = new JwtHelperService();
    this.permission = { id: 1, name: 'admin', codename: 'dashboard', content_type_id: 1 } as IPermission;
  }

  public signIn(data: ITokenDto): Observable<IToken> {
    return this.http.post<IToken>(this.URL, JSON.stringify(data)).pipe(
      tap((res: IToken) => {
        this.token = this.helper.decodeToken(res.access);
        this.cookieService.set('access_token', res.access, new Date(this.token.exp * 1000), '/');
        this.cookieService.set('refresh_token', res.refresh, new Date(this.token.exp * 1000), '/');
        this.setUserToLocalStorage(this.token.user);
        this.currentUserSubject.next(this.token.user);
        this.setPermissions(this.permission);
      }),
      catchError(this.handleError));
  }

  public isLoggedIn(): boolean {
    return this.cookieService.check('access_token');
  }

  public logout(): void {
    this.cookieService.delete('access_token', '/');
    this.cookieService.delete('refresh_token', '/');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null as any);
  }

  public getDecodedAccessToken(token: string): IAccessToken {
    return JSON.parse(window.atob(token.split('.')[1])) as IAccessToken;
  }

  public getCurrentUserSubject(): User {
    return this.currentUserSubject.value;
  }

  public getCurrentUser(): Observable<User> {
    return this.currentUser;
  }

  public setPermissions(permission: IPermission): void {
    this.currentUserSubject.value.user_permissions.push(permission);
    localStorage.setItem('user', JSON.stringify(this.currentUserSubject.value));
  }

  public getUserToLocalStorage(): void {
    this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')!));
  }

  public setUserToLocalStorage(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getDataToLocalStorage(): any {
    return JSON.parse(localStorage.getItem('data')!);
  }

  public hasPermission(permission: string): boolean {
    return this.currentUserSubject.value.user_permissions.some(p => p.codename === permission);
  }

  public handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

}
