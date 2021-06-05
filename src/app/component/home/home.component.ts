import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../../service/authenticate/authentication.service';
import { UserService } from '../../service/userService/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string;
  constructor(private _authenticationService: AuthenticationService,
    private _userService: UserService) { }

  ngOnInit(): void {
    let _jwtHelperService = new JwtHelperService();
    let token = localStorage.getItem("token");
    let tokenValues = _jwtHelperService.decodeToken(token ? token : undefined);
    this.email = _jwtHelperService.decodeToken(token ? token : undefined).subject;
    console.log(tokenValues);
  }

  logOut() {
    this._authenticationService.logOut();
  }

  getAllUser() {
    this._userService.getAllUsers().subscribe((response) => {
      console.log(response)
    }, (error) => {
      console.log(error)
    })
  }

}
