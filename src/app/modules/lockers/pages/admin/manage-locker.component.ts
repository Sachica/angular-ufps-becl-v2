import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Subject, takeUntil, Observable, of } from 'rxjs';

import { ISectionComposite, ISimpleStaff } from '@data/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SectionService } from '@modules/lockers/services/section.service';
import { UserService } from '@core/services/user.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-manage-locker',
  templateUrl: './manage-locker.component.html',
  styleUrls: ['./manage-locker.component.css']
})
export class ManageLockerComponent implements OnInit, OnDestroy {

  public displayedColumnsSection: string[] = ['id', 'section', 'capacity', 'staffs', 'actions'];
  public displayedColumnsStaff: string[] = ['picture', 'name', 'actions'];

  public newSection: UntypedFormGroup;
  public editSection: UntypedFormGroup;

  public dsSection: MatTableDataSource<ISectionComposite>;
  public dsStaff: MatTableDataSource<ISimpleStaff>;

  public myControl: UntypedFormControl;
  public filteredOptions: Observable<ISimpleStaff[]>;

  public noEdit: boolean;
  public currentSection: ISectionComposite;
  private unsubscribe$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private sectionService: SectionService,
    private usersService: UserService
  ) { 
    this.newSection = new UntypedFormGroup({
      section: new UntypedFormControl(),
      capacity: new UntypedFormControl()
    });

    this.editSection = new UntypedFormGroup({
      section: new UntypedFormControl(),
      capacity: new UntypedFormControl()
    });

    this.myControl = new UntypedFormControl('');
    this.noEdit = true;
  }

  ngOnInit(): void {
    this.dsSection = new MatTableDataSource()
    this.dsStaff = new MatTableDataSource();

    this.sectionService.getSections()
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

        this.dsSection = new MatTableDataSource(sections);
        this.dsSection.paginator = this.paginator;
        this.dsSection.sort = this.sort;
      });

      this.myControl.valueChanges.subscribe((name) => {
        this.usersService.filterStaffByName(name)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((data) => {
              this.dsStaff.data.forEach(element => {
                data.forEach((item) => {
                  if(item.id == element.id){
                    data.splice(data.indexOf(item), 1);
                  }
                });
              })
              this.filteredOptions = of(data);
            }
          );
      })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsSection.filter = filterValue.trim().toLowerCase();

    if (this.dsSection.paginator) {
      this.dsSection.paginator.firstPage();
    }
  }

  clearFilter() {
    this.dsSection.filter = '';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  mostrarModal(value: string){
    $('#modal-save').modal(value);
  }

  onSubmit(){
    this.sectionService.saveSection(this.newSection.value)
      .subscribe((data) => {
        const _data = this.dsSection.data;
        _data.push(data);
        this.dsSection.data = _data;
      });
    $('#modal-save').modal('hide');
  }

  selectedStaff(idStaff: number){
    this.filteredOptions.forEach((data) => {
      data.forEach(element => {
        if(element.id == idStaff){
          const _data = this.dsStaff.data;
          _data.push(element);
          this.dsStaff.data = _data;
        }
      });
    });

    this.sectionService.saveStaffSection({
      section_id: this.currentSection.id,
      staff_id: idStaff
    }).subscribe((data) => {
      this.currentSection.staffs.push(data);
    });
    
    this.myControl.setValue(null);
  }

  sectionEdit(section: ISectionComposite){
    this.dsStaff = new MatTableDataSource();

    this.currentSection = section;
    this.editSection.setValue({section: section.section, capacity: section.capacity});

    const _data = this.dsStaff.data;
    section.staffs.forEach((staff) => {
      this.usersService.getStaffById(staff.staff_id)
      .subscribe((data) => {
        _data.push({id: data.id, first_name: data.first_name, last_name: data.last_name, picture: data.picture});
        this.dsStaff.data = _data;
      })
    });

    this.noEdit = false;
  }

  sectionDelete(section: ISectionComposite){
    const _data = this.dsSection.data;
    this.sectionService.deleteSection(section.id)
    .subscribe((data) =>{
      _data.forEach((element, index) => {
        if(element.id == data.id){
          _data.splice(index, 1);
        }
      });
      this.dsSection.data = _data;
    });

    this.dsStaff = new MatTableDataSource();
    this.editSection.reset();
    this.noEdit = true;
  }

  removeStaff(staff: ISimpleStaff){
    const index = this.dsStaff.data.indexOf(staff);
    this.dsStaff.data.splice(index, 1);
    this.dsStaff._updateChangeSubscription();

    this.sectionService.deleteStaffSection({
      section_id: this.currentSection.id,
      staff_id: staff.id
    }).subscribe((data) => {
      this.currentSection.staffs.forEach((element, index) => {
        if(element.staff_id == staff.id){
          this.currentSection.staffs.splice(index, 1);
        }
      });
    });
  }
}
