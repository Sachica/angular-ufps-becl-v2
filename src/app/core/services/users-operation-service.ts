import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@env/environment.development';

import { IUser } from '@data/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserOperationService {

  private readonly url = `${environment.baseUrlUser}`;
  private userSubject: BehaviorSubject<Record<number, IUser>>;
  public readonly users: Observable<Record<number, IUser>>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<Record<number, IUser>>({});
    this.users = this.userSubject.asObservable();
  }

  public setUsers(ids: number[]): Observable<IUser[]> {
    return this.http.post<IUser[]>(`${this.url}list_users_by_ids/`, { id_users: ids })
      .pipe(
        tap((users: IUser[]) => {
          const usersDict: Record<number, IUser> = {};
          users.forEach((user: IUser) => {
            usersDict[user.id] = user;
          });
          this.userSubject.next(usersDict);
        })
      );
  }

  get usersValue(): Record<number, IUser> {
    return this.userSubject.getValue();
  }

  get currentusers(): Observable<Record<number, IUser>> {
    return this.users;
  }

}
