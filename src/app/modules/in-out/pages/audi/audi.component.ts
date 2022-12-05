import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ILogInOut, IUser, IFilterLog } from '@data/interfaces/index';
import { FormControl, FormGroup } from '@angular/forms';
import { UserOperationService } from '@core/services/users-operation-service';
import { InOutService } from '@modules/in-out/services/in-out.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-audi',
  templateUrl: './audi.component.html',
  styleUrls: ['./audi.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AudiComponent implements OnInit {
  date = new FormControl(moment());

  public roles: any = [
    {
      id: 1,
      name: "Todos"
    },
    {
      id: 2,
      name: "Staff"
    },
  ];

  public displayedColumns: string[] = [
    'id', 
    'picture_user', 'first_name_user',
    'date_entry', 'time_entry',
    'date_exit', 'time_exit',
  ];
  public dataSource: MatTableDataSource<ILogInOut>;
  private unsubscribe$ = new Subject<void>();

  private usersSubscription: Subscription | undefined;
  private users: number[] = [];
  public hashUsers: Record<number, any> = {};
  private operations: ILogInOut[] = [];
  private filter: IFilterLog = {} as IFilterLog;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  constructor(
    private userOperationService: UserOperationService,
    private inOutService: InOutService) 
  { }

  ngOnInit(): void {
    this.hashUsers[0] = {} as IUser;
    this.hashUsers[0].picture = 'becl/assets/img/no-profile.png';

    this.filter.filter_date = '';
    this.filter.only_staff = false;
    this.filter.filter_date_v = new Date();
    this.filter.filter_date = this.filter.filter_date_v.toISOString().split('T')[0];
    this.fetchData();
  }
  
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.fetchData();
  }

  fetchData(){
    this.filter.page = this.currentPage;
    this.filter.size_page = this.pageSize;
    console.log(this.filter);
    this.inOutService.getOperationLogs(this.filter).subscribe((operations) => {
      this.operations = operations;
      this.setUsers();
    });
  }

  onlyUnique(value: number, index: number, self: number[]) {
    return self.indexOf(value) === index;
  }

  setUsers(){
    this.operations.forEach((operation) => {
      this.users.push(operation.user_id ?? 0);
    });

    this.users = this.users.filter(this.onlyUnique);

    this.usersSubscription = this.userOperationService
      .setUsers(this.users)
      .subscribe((_users) => {
        _users.forEach((_user: IUser) => {
          this.hashUsers[_user.id] = _user;
        });

        this.dataSource = new MatTableDataSource(this.operations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  getSecureProperty(member: string, id?: number): string{
    return this.hashUsers[id ?? 0][member];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    
    let year = this.date.value?.year() ?? this.filter.filter_date_v.getFullYear();
    let month = this.date.value?.month() ?? this.filter.filter_date_v.getMonth();

    this.filter.filter_date_v = new Date(year, month, 1);
    this.filter.filter_date = this.filter.filter_date_v.toISOString().split('T')[0];
    this.fetchData();
  }

  setFilter(event: any){
    this.filter.only_staff = event.value == 2;
    this.fetchData();
  }

  clearFilter() {
    this.dataSource.filter = '';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.usersSubscription?.unsubscribe();
  }
}
