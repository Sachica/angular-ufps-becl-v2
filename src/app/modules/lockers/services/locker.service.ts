import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment.development';
import { ISectionComposite, ISection, IUser, ISectionStaff } from '@data/interfaces';
import { ISectionStaffSave } from '@data/interfaces/section.interface';

@Injectable({
  providedIn: 'root'
})
export class LockersService {

  private readonly URL = `${environment.baseUrlLocker}`;

  constructor(private http: HttpClient) {}

  public getSections(): Observable<ISectionComposite[]> {
    return this.http.get<ISectionComposite[]>(`${this.URL}sections`);
  }
  
  public saveSection(section: ISection): Observable<ISectionComposite> {
    return this.http.post<ISectionComposite>(`${this.URL}section-save/`, section);
  }

  public deleteSection(idSection: number): Observable<ISection> {
    return this.http.delete<ISection>(`${this.URL}section-delete/${idSection}`);
  }

  public saveStaffSection(sectionStaff: ISectionStaffSave): Observable<ISectionStaff>{
    return this.http.post<ISectionStaff>(`${this.URL}section-staff-save/`, sectionStaff);
  }

  public deleteStaffSection(sectionStaff: ISectionStaffSave): Observable<ISectionStaff>{
    return this.http.post<ISectionStaff>(`${this.URL}section-staff-delete/`, sectionStaff);
  }
}
