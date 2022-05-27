import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { ITokenDTO, IToken } from '@data/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public socialUser: SocialUser = new SocialUser;
  public tokenDTO: ITokenDTO = {} as ITokenDTO;

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.socialUser = user;
      console.log(user);
    });
  }

  public signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data: SocialUser) => {
      this.socialUser = data;
      this.tokenDTO.token = data.idToken;
      this.signIn(this.tokenDTO);
    }).catch((error) => {
      console.log(error);
    });
  }

  public signIn(data: ITokenDTO): void {
    this.authService.signIn(data).subscribe((token: IToken) => {
      console.log(token);
      this.router.navigate(['/account/profile']);
    });
  }

}
