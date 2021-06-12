import {Component, OnInit} from '@angular/core';
import {UserSignUp} from '../../model/UserSignUp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../model/Customer.model';
import {CustomerService} from '../../service/customer/customer.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from '../../service/authenticate/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public userSignUp: UserSignUp = new UserSignUp();
  public formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder, private _authenticationService: AuthenticationService,
              private _routerService: Router) {
  }


  ngOnInit(): void {
    this.buildReactiveForm();
  }

  public signUp() :void{
    console.log('formLogin.value = > ', this.formLogin.value);
    this.userSignUp.email = this.formLogin.value.email;
    this.userSignUp.userName = this.formLogin.value.userName;
    this.userSignUp.password = this.formLogin.value.password;
    this.userSignUp.phoneNumber = this.formLogin.value.phoneNumber;
    this.userSignUp.gender = this.formLogin.value.gender;
    this.userSignUp.role = this.formLogin.value.role;
    this.userSignUp.birthDate = this.formLogin.value.birthDate;
    this.userSignUp.address.country = this.formLogin.value.country;
    this.userSignUp.address.city = this.formLogin.value.city;
    this.userSignUp.address.street = this.formLogin.value.street;

    console.log('Customer = > ', this.userSignUp);

    this._authenticationService.signUp(this.userSignUp)
      .subscribe((response) => {
        console.log('response => ', response);
        //
      }, (error: HttpErrorResponse) => {

        console.log('error => ', error);
        //
      });
  }

  private buildReactiveForm(): void {
    this.formLogin = this.formBuilder.group({
      email: ['foo@gmail.com', [Validators.email, Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      password: ['', [Validators.required]],
      phoneNumber: ['010000000', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      gender: ['', [Validators.required]],
      userName: ['', Validators.required, Validators.maxLength(20), Validators.minLength(8)],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      role: ['', [Validators.required]],
      birthDate: ['', [Validators.required]]
    });
  }

}
