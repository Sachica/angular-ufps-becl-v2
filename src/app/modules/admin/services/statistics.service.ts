import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { IStatistics, IGeneral } from '@data/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private readonly URL = `${environment.baseUrlEntrance}statistics/`;
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
  private body: Partial<IBody> = {
    'program': true,
    'facultad': true,
    'group': true,
    'type_chart': 'round',
    'current': false,
  };

  constructor(
    private http: HttpClient
  ) { }

  getStatistics(): Observable<IStatistics> {
    this.body.type_chart = 'round';
    return this.http.post<IStatistics>(this.URL, this.body, { headers: this.headers });
  }

  getStatisticsCurrent(): Observable<any> {
    this.body.type_chart = 'bar';
    this.body.date_filter = new Date().toISOString().split('T')[0];
    return this.http.post<any>(this.URL, this.body, { headers: this.headers });
  }

}

export interface IBody {
  program: boolean;
  facultad: boolean;
  group: boolean;
  type_chart: string;
  current: boolean;
  only_day: boolean;
  date_filter: string;
}
