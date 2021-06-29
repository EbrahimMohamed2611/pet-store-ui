import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/model/Address.model';
import { UserService } from 'src/app/service/user/user.service';
import { Customer } from '../../model/Customer.model';
import { CustomerService } from '../../service/customer/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  optionsSelect: Array<any>;
  selected: any;
  // customer: Customer ={
  //   id: 0,
  //   email: "string",
  //   phoneNumber: "string",
  //   address:{
  //     street: "string",
  //     city: "string",
  //     country: "string"
  //   },
  //   role: "string",
  //   userName: "string",
  //   gender: "string",
  //   birthDate: new Date(),
  //   password: "string",
  //   firstName: "string",
  //   lastName: "string"
  // }
  customer: Customer = new Customer();
  isAddressExist: boolean = false;

  isEditable: boolean = false;

  constructor(private customerService: CustomerService, private toaster: ToastrService,
    private _userService: UserService) {
  }

  ngOnInit(): void {
    // this.customer.address = { street: "", city: "", country: "" };
    this.isEditable = false;
    this.getCustomerProfile();
  }

  public update(customer: Customer) {
    this.customerService.updateCustomer(this.customer).subscribe((response: Customer) => {
      // console.log(customer);
      this.isEditable = false;
    }, (error: HttpErrorResponse) => {
      this.toaster.error(error.message)
    });


  }

  public edit() {
    // console.log(this.isEditable)
    this.isEditable = true;
    // console.log(this.isEditable)
  }

  public cancel() {
    this.isEditable = false;
  }

  private getCustomerProfile() {
    this.customerService.getCustomer(this._userService.getUserId()).subscribe((response: Customer) => {
      if (response.address == null) {
        const address = new Address();
        address.city = " ";
        address.street = " ";
        address.country = " ";
        this.customer.address = address;
      }
      this.customer = response;
    }, (error: HttpErrorResponse) => {
      this.toaster.error(error.message)
    });
  }
}
