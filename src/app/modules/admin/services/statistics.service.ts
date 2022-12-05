import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment.development';
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
    'only_day': false,
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
    this.body.program = true;
    this.body.facultad = true;
    this.body.group = true;
    this.body.current = false;
    this.body.date_filter = new Date().toISOString().split('T')[0];
    return this.http.post<any>(this.URL, this.body, { headers: this.headers });
  }

  getStatisticsLabelCurrent(): Observable<any> {
    this.body.type_chart = 'bar';
    this.body.program = true;
    this.body.facultad = true;
    this.body.group = true;
    this.body.current = false;
    this.body.only_day = true;
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

export interface IEntrance {
  visits: number;
  visitors: number;
  avg_time: number;
}
