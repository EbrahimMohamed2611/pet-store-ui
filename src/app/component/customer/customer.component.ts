import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../service/customer/customer.service';
import {Customer} from '../../model/Customer.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer: Customer = new Customer();
  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService) {
  }

  ngOnInit(): void {
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

  // tslint:disable-next-line:typedef
  public addNewCustomer() {

    //console.log('formLogin.value = > ', this.formLogin.value);
    // Object.assign(this.customer, this.formLogin.value);
    this.customer.email =   this.formLogin.value.email;
    this.customer.userName =   this.formLogin.value.userName;
    this.customer.password =   this.formLogin.value.password;
    this.customer.phoneNumber =   this.formLogin.value.phoneNumber;
    this.customer.gender =   this.formLogin.value.gender;
    this.customer.role =   this.formLogin.value.role;
    this.customer.birthDate =   this.formLogin.value.birthDate;
    this.customer.address.country =   this.formLogin.value.country;
    this.customer.address.city =  this.formLogin.value.city;
    this.customer.address.street =  this.formLogin.value.street;

    //console.log('Customer = > ', this.customer);

    this.customerService.addNewCustomer(this.customer)
      .subscribe((response) => {
        //console.log('response => ', response);
        //
      }, (error: HttpErrorResponse) => {

        //console.log('error => ', error);
        //
      });
  }

  public getCustomerByID(id:number){

  }


}
