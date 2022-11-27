import { Component, OnInit } from '@angular/core';

import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from '@modules/auth/services/auth.service';
import { UserService } from '@core/services/user.service';
import { Router } from '@angular/router';
import { ITokenDto, IToken } from '@data/interfaces';
import { User } from '@data/models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public tokenDto: ITokenDto = {} as ITokenDto;

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      if(user){
        this.tokenDto.token = user.idToken;
        this.signIn(this.tokenDto);
      }
    });
  }
  
  public signIn(data: ITokenDto): void {
    this.authService.signIn(data).subscribe((token: IToken) => {
      this.userService.userProfile().subscribe((user: User) => {
        this.router.navigate(['/account/profile']);
      });
    });
  }

}
