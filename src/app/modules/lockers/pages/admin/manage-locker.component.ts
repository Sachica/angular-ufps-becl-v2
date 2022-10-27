import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ISectionComposite, IUser } from '@data/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LockersService } from '@modules/lockers/services/locker.service';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-manage-locker',
  templateUrl: './manage-locker.component.html',
  styleUrls: ['./manage-locker.component.css']
})
export class ManageLockerComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = ['id', 'section', 'capacity', 'staffs'];
  public dataSource: MatTableDataSource<ISectionComposite>;
  private unsubscribe$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private lockersService: LockersService,
    private usersService: UserService
  ) { }

  ngOnInit(): void {
    this.lockersService.getSections()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        let sections: ISectionComposite[] = data.map(
          ({ id, section, capacity, staffs}: ISectionComposite) => {
            return {
              id, 
              section, 
              capacity, 
              staffs
            };
          });

        console.log({ sections });

        this.dataSource = new MatTableDataSource(sections);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.dataSource.filter = '';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
