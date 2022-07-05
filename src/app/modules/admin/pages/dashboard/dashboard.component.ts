import { Component, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { IStatistics, IGeneral } from '@data/interfaces';
import { StatisticsService } from '@modules/admin/services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chart: any = [];
  labels: string[] = [];
  visitors: number[] = [];
  visits: number[] = [];

  constructor(private statisticsService: StatisticsService) {
    Chart.register(...registerables);
    this.statisticsService.getStatisticsCurrent().subscribe((data: any) => {
      this.getLabels(data);
      this.getProperty(data, false);
      this.getProperty(data, true);
      this.chart.update();
    });
  }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "Visitors",
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: this.visitors
          },
          {
            label: "Visits",
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: this.visits
          }
        ],
      }
    });
  }

  getLabels(obj: any): void {
    for (let i = 1; i <= Object.keys(obj).length; i++) {
      this.labels.push(i.toString());
    }
  }

  getProperty(obj: any, prop: boolean): void {
    for (const key in obj) {
      if (prop) {
        const value = obj[key].visits;
        this.visits.push(value);
      } else {
        const value = obj[key].visitors;
        this.visitors.push(value);
      }
    }
  }

}
