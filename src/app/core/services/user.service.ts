import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env/environment.development';
import { User } from '@data/models';
import { ISimpleStaff, ISimpleUser, IUser } from '@data/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL = `${environment.baseUrlUser}`;
  public currentUser: User;

  constructor(private http: HttpClient) {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null;
  }

  public userProfile(): Observable<User> {
    return this.http.get<User>(`${this.URL}profile/`).pipe(
      map((user: User) => {
        this.currentUser = user;
        this.currentUser.picture = (this.currentUser.picture) ? this.currentUser.picture : 'becl/assets/img/profile.jpg';
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        return user;
      }),
      catchError(this.handleError));
  }

  public getStaffById(id: number): Observable<ISimpleStaff> {
    return this.http.get<ISimpleStaff>(`${this.URL}users/${id}`);
  }

  public getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.URL}users/${id}`);
  }

  public filterStaffByName(name: string): Observable<ISimpleStaff[]> {
    return this.http.get<ISimpleStaff[]>(`${this.URL}filter-staff/${name}`);
  }

  public handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

}
