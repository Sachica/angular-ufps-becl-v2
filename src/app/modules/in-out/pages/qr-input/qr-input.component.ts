import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { InOutService } from '@modules/in-out/services/in-out.service';

@Component({
  selector: 'app-qr-input',
  templateUrl: './qr-input.component.html',
  styleUrls: ['./qr-input.component.css']
})
export class QrInputComponent implements OnInit, OnDestroy {

  style: any = this._renderer2.createElement('style');
  obj: any = {
    token: '',
  };

  constructor(
    private inOutService: InOutService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit(): void {
    this.style.innerHTML = `
      body {
        background-image: url('assets/img/fondo.svg');
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
    const input = document.getElementById('qrInput') as HTMLInputElement;
    input.value = '';
  }

  onSubmit() {
    this.inOutService.getConfirmEntrance(this.obj).subscribe((data: any) => {
      console.log(data);
    });
  }

}
