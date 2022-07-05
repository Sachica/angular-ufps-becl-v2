import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

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

}
