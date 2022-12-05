import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { IAcquireLocker, ISection } from '@data/interfaces';
import { ILockerSimple, IUser, IProgram, IFacultad } from '@data/interfaces/index';
import { LockersService } from '@modules/lockers/services/locker.service';
import { SectionService } from '@modules/lockers/services/section.service';
import { FormControl, FormGroup } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-lockers',
  templateUrl: './lockers.component.html',
  styleUrls: ['./lockers.component.css']
})
export class LockersComponent implements OnInit {

  public asignedSection: ISection[];

  public currentLockers: ILockerSimple[];

  public lastLockerOperation: ILockerSimple = {} as ILockerSimple;

  public currentLockerUser: IUser = {} as IUser;

  public qrReader: FormGroup;

  constructor(
    private sectionService: SectionService,
    private lockersService: LockersService,
    private usersService: UserService
  ) {
    this.qrReader = new FormGroup({
      token: new FormControl(),
      id_section: new FormControl(),
      id_staff: new FormControl(this.usersService.currentUser.id),
    });
    this.lastLockerOperation.locker = '';
    this.setDefault(false);
   }

  ngOnInit(): void {
    this.sectionService.getSectionsForStaff(this.usersService.currentUser.id)
    .subscribe((data) => {
      this.asignedSection = data;
    });
  }

  onChange(){
    if(!this.qrReader.controls['id_section'].value) return;

    let token = this.getDecodedAccessToken(this.qrReader.controls['token'].value);
    if(token){
      this.usersService.getUserById(token.id).subscribe((user) => {
        this.currentLockerUser = user;
      });

      this.lockersService.acquireLocker(this.qrReader.value).subscribe((locker) => {
        this.currentLockers.forEach((_locker) => {
          if(_locker.locker == locker.locker){
            _locker.available = locker.available;
            Object.assign(this.lastLockerOperation, _locker);
          }
        });
      });
      this.setTimeout();
    }
    this.qrReader.controls['token'].patchValue('');
  }

  setTimeout() {
    setTimeout(() => {
      this.setDefault();
    }, 10000);
  }

  setDefault(full: boolean = true): void {
    this.currentLockerUser.picture = 'becl/assets/img/no-profile.png';
    this.currentLockerUser.program = {} as IProgram;
    this.currentLockerUser.first_name = '';
    this.currentLockerUser.program.name = '';
    if(full){
      this.lastLockerOperation.available = true;
      this.lastLockerOperation.locker = '';
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  setUser(user: IUser){
    this.currentLockerUser = user;
  }

  public getLockers(section: ISection){section.id
    this.qrReader.controls['id_section'].patchValue(section.id);
    this.lockersService.getLockersBySection(section.id)
    .subscribe((data) => {
      this.currentLockers = data;
    });
  }
}
