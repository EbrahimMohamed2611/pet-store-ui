import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../model/User.model';
import {AuthenticationService} from '../../service/authenticate/authentication.service';
import {SocialMediaService} from "../../service/socialMedia/social-media.service";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {SocialMediaToken} from "../../model/SocialMediaToken.model";
import {AuthenticationResponse} from "../../model/AuthenticationResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  user: User = new User();
  token: string;

  constructor(private _formBuilder: FormBuilder,
              private _authenticationService: AuthenticationService,
              private _routerService: Router,
              private authService: SocialAuthService,
              private _socialMediaService: SocialMediaService,
              private toasterService: ToastrService) {

  }

  // constructor(private _formBuilder: FormBuilder,
  //             private _routerService: Router,
  //             private authService: SocialAuthService,
  //             private _socialMediaService: SocialMediaService) {
  //
  // }


  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      password: ['', [Validators.required]]
    });

  }


  public login() {
    Object.assign(this.user, this.formLogin.value);

    this._authenticationService.authenticate(this.user).subscribe((response: any) => {
      if (response.jwtToken) {
        this._authenticationService.login(response.jwtToken);
        this._routerService.navigate(['/home']);
      }
    }, (error:HttpErrorResponse) => {

      this.toasterService.error(error.error.message);
    })

  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((response) => {
      let token = new SocialMediaToken();
      token.token = response.idToken;
      this._socialMediaService.loginWithGoogle(token).subscribe((response: AuthenticationResponse) => {
        console.log(response.jwtToken);
        this._authenticationService.login(response.jwtToken);
        this._routerService.navigate(['/home']);
      }, (error: HttpErrorResponse) => {

        this.toasterService.error(error.error.message);
      })

    }, (error: HttpErrorResponse) => {
      this.toasterService.error(error.error.message);
    })
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((response) => {
      let token = new SocialMediaToken();
      token.token = response.authToken;
      this._socialMediaService.loginWithFacebook(token).subscribe((response: AuthenticationResponse) => {
        console.log(response.jwtToken);
        this._authenticationService.login(response.jwtToken);
        this._routerService.navigate(['/home']);
      }, (error: HttpErrorResponse) => {
        this.toasterService.error(error.error.message);
      })
    }, (error: HttpErrorResponse) => {
      this.toasterService.error(error.error.message);
    })
  }


}
