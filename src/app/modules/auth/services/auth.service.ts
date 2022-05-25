import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = `${environment.baseUrlAuth}sign_in/`;
  private headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  public user: any = {};

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public signIn(data: any): Observable<any> {
    return this.http.post<any>(this.URL, JSON.stringify(data), { headers: this.headers }).pipe(
      tap((res: any) => {
        this.cookieService.set('access_token', res.access, new Date(this.getDecodedAccessToken(res.access).exp * 1000), '/');
        this.cookieService.set('refresh_token', res.refresh, new Date(this.getDecodedAccessToken(res.refresh).exp * 1000), '/');
        this.user = this.getDecodedAccessToken(res.access).user;
        localStorage.setItem('user', JSON.stringify(this.user));
      }),
      catchError(this.handleError));
  }

  public isLoggedIn(): boolean {
    return this.cookieService.check('access_token');
  }

  public logout(): void {
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
  }

  public getDecodedAccessToken(token: string): any {
    try {
      return JSON.parse(window.atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  public getCurrentUser(): any {
    return this.user;
  }

  public handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

}
