import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IOperationLog, IUser } from '@data/interfaces';
import { LockersService } from '@modules/lockers/services/locker.service';
import { UserService } from '@core/services/user.service';
import { UserOperationService } from '@core/services/users-operation-service';

@Component({
  selector: 'app-audi',
  templateUrl: './audi.component.html',
  styleUrls: ['./audi.component.css']
})
export class AudiComponent implements OnInit {

  public displayedColumns: string[] = [
    'id', 
    'picture_user_locker', 'first_name_user_locker',
    'date_entry', 'time_entry',
    'date_exit', 'time_exit',
    'picture_staff_lock', 'first_name_staff_lock', 
    'picture_staff_release', 'first_name_staff_release',
  ];
  public dataSource: MatTableDataSource<IOperationLog>;
  private unsubscribe$ = new Subject<void>();

  private usersSubscription: Subscription | undefined;
  private users: number[] = [];
  public hashUsers: Record<number, any> = {};
  private operations: IOperationLog[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  constructor(
    private lockersService: LockersService,
    private userOperationService: UserOperationService,
    private usersService: UserService) 
  { }

  ngOnInit(): void {
    this.hashUsers[0] = {} as IUser;
    this.hashUsers[0].picture = 'becl/assets/img/no-profile.png';

    this.lockersService.operationLogLockers({page: 0, size_page: 10}).subscribe((operations) => {
      this.operations = operations;
      this.setUsers();
    });
  }
  
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.fetchData();
  }

  fetchData(){
    this.lockersService.operationLogLockers({page: this.currentPage, size_page: this.pageSize}).subscribe((operations) => {
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
      this.users.push(operation.staff_lock_id ?? 0);
      this.users.push(operation.staff_release_id ?? 0);
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

  clearFilter() {
    this.dataSource.filter = '';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.usersSubscription?.unsubscribe();
  }
}
