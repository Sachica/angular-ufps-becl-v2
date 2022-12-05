import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment.development';
import { ILogInOut, IFilterLog } from '@data/interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class InOutService {

  private readonly URL = `${environment.baseUrlEntrance}`;

  constructor(
    private http: HttpClient
  ) { }

  public getConfirmEntrance(obj: any): Observable<any> {
    return this.http.post<any>(`${this.URL}confirm_entrance/`, JSON.stringify(obj));
  }

  public getConfirmExit(obj: any): Observable<any> {
    return this.http.post<any>(`${this.URL}confirm_exit/`, JSON.stringify(obj));
  }

  public getOperationLogs(filter: IFilterLog): Observable<ILogInOut[]> {
    return this.http.post<ILogInOut[]>(`${this.URL}get_logs/`, filter);
  }
}
