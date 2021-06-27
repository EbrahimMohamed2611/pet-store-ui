import {Component, OnInit} from '@angular/core';
import {UserSignUp} from '../../model/UserSignUp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../model/Customer.model';
import {CustomerService} from '../../service/customer/customer.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from '../../service/authenticate/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public userSignUp: UserSignUp = new UserSignUp();
  public formLogin: FormGroup;
  public isExist: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private _authenticationService: AuthenticationService,
              private _routerService: Router,
              private toasterService: ToastrService) {
  }


  ngOnInit(): void {
    this.buildReactiveForm();
  }

  public signUp(): void {
    this.aggregateUserData();
    this._authenticationService.signUp(this.userSignUp)
      .subscribe((response) => {
        this._routerService.navigate(['/login']);
      }, (error: HttpErrorResponse) => {
        this.toasterService.error(error.error.message);
      });
  }

  private buildReactiveForm(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^(0-9)*$")]],
      gender: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
      street: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      role: ['', [Validators.required]],
      birthDate: ['', [Validators.required]]
    });
  }

  private aggregateUserData(): void {
    this.userSignUp.email = this.formLogin.value.email;
    this.userSignUp.firstName = this.formLogin.value.firstName;
    this.userSignUp.lastName = this.formLogin.value.lastName;
    this.userSignUp.userName = this.formLogin.value.userName;
    this.userSignUp.password = this.formLogin.value.password;
    this.userSignUp.phoneNumber = this.formLogin.value.phoneNumber;
    this.userSignUp.gender = this.formLogin.value.gender;
    // this.userSignUp.role = this.formLogin.value.role;
    this.userSignUp.birthDate = this.formLogin.value.birthDate;
    this.userSignUp.address.country = this.formLogin.value.country;
    this.userSignUp.address.city = this.formLogin.value.city;
    this.userSignUp.address.street = this.formLogin.value.street;
  }

  checkIfEmailExist(event: any) {
    console.log(event.target.value);
    let userEmail = {"email":event.target.value};
    this._authenticationService.checkEmailExist(userEmail).subscribe((response) => {
      // console.log("response " ,response);
      this.isExist = true;
    }, (error: HttpErrorResponse) => {
      // this.toasterService.error(error.error.message)
      this.isExist = false;
      // console.log("error " ,error);
    })
  }
}
