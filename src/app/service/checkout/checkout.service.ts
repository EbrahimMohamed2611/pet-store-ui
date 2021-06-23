import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../userService/user.service";
import {Observable} from "rxjs";
import {CartItem} from "../../model/CartItem.model";
import {Product} from "../../model/Product.model";
import {Order} from "../../model/Order.model";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {


  private URL = environment.apiUrl + 'customers/';

  constructor(private httpClient: HttpClient) {
  }


  public createOrder(order: Order): Observable<Order> {
    // let userId = this.userService.getUserId();
    let userId = 1;
    // @ts-ignore
    return this.httpClient.post(this.URL + `${userId}/orders`, order);
  }
}
