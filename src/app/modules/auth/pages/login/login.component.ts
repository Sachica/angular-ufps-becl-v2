import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { ITokenDto, IToken } from '@data/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public tokenDto: ITokenDto = {} as ITokenDto;

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data: SocialUser) => {
      this.tokenDto.token = data.idToken;
      this.signIn(this.tokenDto);
    }).catch((error) => {
      console.log(error);
    });
  }

  public signIn(data: ITokenDto): void {
    this.authService.signIn(data).subscribe((token: IToken) => {
      this.router.navigate(['/account/profile']);
    });
  }

}
