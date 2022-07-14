import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env/environment.development';
import { User } from '@data/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL = `${environment.baseUrlUser}profile/`;
  public currentUser: User;

  constructor(private http: HttpClient) {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null;
  }

  public userProfile(): Observable<User> {
    return this.http.get<User>(this.URL).pipe(
      map((user: User) => {
        this.currentUser = user;
        this.currentUser.picture = (this.currentUser.picture) ? this.currentUser.picture : 'assets/img/profile.jpg';
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        return user;
      }),
      catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

}
