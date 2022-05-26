import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: SocialUser = new SocialUser;
  public tokenDTO: any = {
    token: '',
  };

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

  public signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data: SocialUser) => {
      this.tokenDTO.token = data.idToken;
      this.signIn(this.tokenDTO);
    }).catch((error) => {
      console.log(error);
    });
  }

  public signIn(data: any): void {
    this.authService.signIn(data).subscribe((res: any) => {
      this.router.navigate(['/admin/dashboard']);
    });
  }

}
