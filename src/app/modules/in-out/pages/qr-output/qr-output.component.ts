import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { InOutService } from '@modules/in-out/services/in-out.service';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-qr-output',
  templateUrl: './qr-output.component.html',
  styleUrls: ['./qr-output.component.css']
})
export class QrOutputComponent implements  OnInit, OnDestroy {

  style: any = this._renderer2.createElement('style');

  obj: Partial<IInOut> = {};

  user: Partial<IUser> = {};

  constructor(
    private inOutService: InOutService,
    private usersService: UsersService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.obj.token = '';
    this.setDefault();
  }

  ngOnInit(): void {
    this.style.innerHTML = `
      body {
        background-image: url('assets/img/in-out/fondo.svg');
        background-color: white;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .titulo {
        font-size: 10em !important;
        font-family: 'Roboto', sans-serif !important;
        color: white !important;
        text-align: center !important;
        margin-top: 20px !important;
        margin-bottom: 20px !important;
      }

      .userData{
        color: #A81F2B;
        font-size: 1.5em !important;
      }

      .input{
        text-align: center
      }

      .ufps{
        width: 100%;
        height: 100%;
      }

      .qrUFPS{
        width: 200px;
        height: 200px;
      }

      .margin{
        margin-top: 150px;
      }
        `;
    this._renderer2.appendChild(this._document.head, this.style);
  }

  ngOnDestroy(): void {
    this._renderer2.removeChild(this._document.head, this.style);
  }

  onChange(event: any) {
    this.obj.token = event.target.value;
    this.onSubmit();
    (document.getElementById('qrOutput') as HTMLInputElement).value = '';
  }

  onSubmit() {
    this.inOutService.getConfirmExit(this.obj).subscribe((data: any) => {
      this.usersService.getUser(data.user_id).subscribe((user: any) => {
        this.user.code = user.id;
        this.user.fullName = user.first_name + ' ' + user.last_name;
        this.user.photo = user.picture.split('=')[0];
        this.user.program = user.program.name;
        this.user.status = (user.is_active) ? 'Activo' : 'Inactivo';
      });
    });
    this.setTimeout();
  }

  setTimeout() {
    setTimeout(() => {
      this.setDefault();
    }, 10000);
  }

  setDefault(): void {
    this.user.code = '----';
    this.user.fullName = '----';
    this.user.photo = 'assets/img/in-out/icons/userProfile.svg';
    this.user.program = '----';
    this.user.status = '----';
  }

}

export interface IUser {
  code: string;
  fullName: string;
  photo: string;
  program: string;
  status: string;
}

export interface IInOut {
  token: string;
}
