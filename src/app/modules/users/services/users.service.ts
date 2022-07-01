import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { IUser } from '@data/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly URL = `${environment.baseUrlUser}users/`;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.URL);
  }

  public getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.URL}${id}`);
  }

  public updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.URL}${user.id}`, user);
  }

}
