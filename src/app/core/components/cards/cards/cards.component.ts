import { Component, Input, OnInit } from '@angular/core';
import { ILockerSimple } from '@data/interfaces/locker.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() locker!: ILockerSimple;

  constructor() { }

  ngOnInit(): void {
    if(!this.locker){
      this.locker = {} as ILockerSimple;
      this.locker.locker = '';
    }
  }

  getColorCard(): string {
    if(this.locker.locker == ''){
      return 'btn-secondary';
    }
    return this.locker.available ? 'btn-success': 'btn-danger';
  }
}
