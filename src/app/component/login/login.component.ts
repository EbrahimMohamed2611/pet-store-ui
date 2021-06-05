import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model/User.mode';
import { AuthenticationService } from '../../service/authenticate/authentication.service';
import { UserService } from '../../service/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  user: User = new User();
  token: string;

  constructor(private _formBuilder: FormBuilder, private _userService: UserService,
    private _authenticationService: AuthenticationService,
    private _routerService: Router) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      email: ['ebrahim@gmail.com', [Validators.email, Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      password: ['', [Validators.required]]
    });
    this.getAllUsers();
  }


  public login() {
    Object.assign(this.user, this.formLogin.value);

    this._authenticationService.login(this.user).subscribe((response: any) => {

      console.log(response);
      if (response.jwtToken) {
        localStorage.setItem("token", response.jwtToken);
        this._routerService.navigate(["home"]);
      }
    }, (error: Error) => {

      console.log(error);
    })

  }


  public getAllUsers() {
    this._userService.getAllUsers().subscribe((response: Response) => {
      console.log("response.headers ", response.headers.get("authorization"));
    });
  }
}
