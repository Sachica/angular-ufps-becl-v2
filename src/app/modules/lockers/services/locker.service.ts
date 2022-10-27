import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment.development';
import { ISectionComposite, ISection, IUser } from '@data/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LockersService {

  private readonly URL = `${environment.baseUrlLocker}`;

  constructor(private http: HttpClient) {}

  public getSections(): Observable<ISectionComposite[]> {
    return this.http.get<ISectionComposite[]>(`${this.URL}/sections`);
  }
  
  public createSection(section: ISection): Observable<ISection> {
    return this.http.post<ISection>(`${this.URL}/sections`, section);
  }

}
