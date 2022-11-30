import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { IUser } from '@data/interfaces';
import { ILockerSimple } from '@data/interfaces/locker.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() locker!: ILockerSimple;

  @Output() userEvent = new EventEmitter<IUser>();;

  private user: IUser;

  constructor(
    private usersService: UserService
  ) { }

  ngOnInit(): void {
    if(!this.locker){
      this.locker = {} as ILockerSimple;
      this.locker.locker = '';
    }
  }

  isLockerDefault(){
    return this.locker.locker == '';
  }

  getColorCard(): string {
    if(this.isLockerDefault()){
      return 'btn-secondary';
    }
    return this.locker.available ? 'btn-success': 'btn-danger';
  }

  searchUser(){
    if(this.isLockerDefault()) return;
    
    if(!this.locker.available && !this.user){
      this.usersService.getUserById(this.locker.user_id).subscribe((user) => {
        this.user = user;
        this.userEvent.emit(this.user);
      });
    }else if(this.locker && this.user){
      this.userEvent.emit(this.user);
    }
  }
}
