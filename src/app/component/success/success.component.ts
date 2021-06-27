import {Component, OnInit} from '@angular/core';
import {Order} from '../../model/Order.model';
import {HttpErrorResponse} from '@angular/common/http';
import {CheckoutService} from '../../service/checkout/checkout.service';
import {loadStripe} from '@stripe/stripe-js/pure';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  private order: Order = new Order();
  private userId = 1;

  constructor(
    private checkoutService: CheckoutService,
  ) {
  }

  ngOnInit(): void {
    this.createOrder();
  }

  private createOrder(): void {
    // tslint:disable-next-line:no-non-null-assertion
    this.order = JSON.parse(localStorage.getItem('customerOrder')!)  ;
    localStorage.removeItem('customerAddress');
    this.checkoutService.createOrder(this.order, this.userId).subscribe((orderResponse: Order) => {
      console.log(orderResponse);
    }, (error: HttpErrorResponse) => {
      console.log(error.message);
    });
  }

}
