import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { ISection } from '@data/interfaces';
import { ILockerSimple } from '@data/interfaces/locker.interface';
import { LockersService } from '@modules/lockers/services/locker.service';
import { SectionService } from '@modules/lockers/services/section.service';

@Component({
  selector: 'app-lockers',
  templateUrl: './lockers.component.html',
  styleUrls: ['./lockers.component.css']
})
export class LockersComponent implements OnInit {

  public asignedSection: ISection[];

  public currentLockers: ILockerSimple[];

  constructor(
    private sectionService: SectionService,
    private lockersService: LockersService,
    private usersService: UserService
  ) { }

  ngOnInit(): void {
    this.sectionService.getSectionsForStaff(this.usersService.currentUser.id)
    .subscribe((data) => {
      this.asignedSection = data;
    });
  }

  public getLockers(section: ISection){
    this.lockersService.getLockersBySection(section.id)
    .subscribe((data) => {
      this.currentLockers = data;
    });
  }
}
