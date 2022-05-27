import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@env/environment';
import { IAccessToken, IToken, ITokenDTO, IPermission } from '@data/interfaces';
import { User } from '@data/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = `${environment.baseUrlAuth}sign_in/`;
  private userSubject: BehaviorSubject<User>
  public user: Observable<User>
  private token: IAccessToken = {} as IAccessToken;
  public permission: IPermission = {
    id: 1,
    name: 'admin',
    codename: 'dashboard',
    content_type_id: 1
  } as IPermission;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  public signIn(data: ITokenDTO): Observable<IToken> {
    return this.http.post<IToken>(this.URL, JSON.stringify(data)).pipe(
      tap((res: IToken) => {
        this.token = this.getDecodedAccessToken(res.access);
        this.cookieService.set('access_token', res.access, new Date(this.token.exp * 1000), '/');
        this.cookieService.set('refresh_token', res.refresh, new Date(this.token.exp * 1000), '/');
        this.setUserToLocalStorage(this.token.user);
        this.userSubject.next(this.token.user);
        this.setPermissions(this.permission);
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
    this.userSubject.next(null as any);
  }

  public getDecodedAccessToken(token: string): IAccessToken {
    return JSON.parse(window.atob(token.split('.')[1])) as IAccessToken;
  }

  public getCurrentUser(): User {
    return this.userSubject.value;
  }

  public setPermissions(permission: IPermission): void {
    this.userSubject.value.user_permissions.push(permission);
    localStorage.setItem('user', JSON.stringify(this.userSubject.value));
  }

  public getUserToLocalStorage(): void {
    this.userSubject.next(JSON.parse(localStorage.getItem('user')!));
  }

  public setUserToLocalStorage(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public hasPermission(permission: string): boolean {
    console.log(permission);
    const rta = this.getCurrentUser().user_permissions.some(p => p.codename === permission);
    console.log(rta);
    return rta;
  }

  public handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

}
