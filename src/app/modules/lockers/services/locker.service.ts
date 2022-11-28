import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment.development';
import { ILockerSimple, IAcquireLocker } from '@data/interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class LockersService {
  private readonly URL = `${environment.baseUrlLocker}`;

  constructor(private http: HttpClient) {}

  public getLockersBySection(idSection: number): Observable<ILockerSimple[]> {
    return this.http.get<ILockerSimple[]>(`${this.URL}lockers-section/${idSection}`);
  }

  public acquireLocker(acquireLocker: IAcquireLocker): Observable<ILockerSimple> {
    return this.http.post<ILockerSimple>(`${this.URL}action-locker/`, acquireLocker);
  }
}
