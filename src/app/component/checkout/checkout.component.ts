import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../service/customer/customer.service";
import {CheckoutService} from "../../service/checkout/checkout.service";
import {Customer} from "../../model/Customer.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {ShoppingCartService} from "../../service/shoppingCart/shopping-cart.service";
import {CartItem} from "../../model/CartItem.model";
import {Order} from "../../model/Order.model";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public customer: Customer = new Customer();
  public cartItems: CartItem[] = [];
  public subTotal: number = 0;
  public disableOrEnableOrderButton: boolean;
  public isDefaultAddress: boolean = true;
  public order: Order = new Order();

  constructor(private customerService: CustomerService,
              private checkoutService: CheckoutService,
              private shoppingCartService: ShoppingCartService,
              private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    this.getShoppingCart();
    this.getCustomerDetails();
  }


  public getShoppingCart(): void {
    this.shoppingCartService.getShoppingCartForUser().subscribe((cartItems: CartItem[]) => {
      this.cartItems = cartItems;
      cartItems.forEach((item) => {
        this.subTotal += item.quantity * item.product.price;
      })
      console.log(cartItems);
    }, (error: HttpErrorResponse) => {
      this.toasterService.error(error.message);
    });
  }

  private getCustomerDetails(): void {
    this.customerService.getCustomer(1).subscribe((customer: Customer) => {
      this.customer = customer;
      console.log("this.customer ",this.customer)
    }, (error: HttpErrorResponse) => {
      this.toasterService.error(error.message)
    })
  }

  public agreeOnTermsAndCondition(): void {
    this.disableOrEnableOrderButton = !this.disableOrEnableOrderButton;
  }

  public shipToDifferentAddress(): void {
    this.isDefaultAddress = !this.isDefaultAddress;
  }

  public createOrder(){
    this.order.address = this.customer.address;
    this.checkoutService.createOrder(this.order).subscribe((orderResponse: Order) =>{
      console.log(orderResponse);
      this.toasterService.success("Your Order is Completed Please Check your Email For More Details")
    }, (error:HttpErrorResponse)=>{
      console.log(error.message)
    })
  }

}
