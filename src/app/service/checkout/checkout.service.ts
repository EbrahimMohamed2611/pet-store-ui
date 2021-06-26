import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {Order} from "../../model/Order.model";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {


  private URL = environment.apiUrl + 'customers/';

  constructor(private httpClient: HttpClient,
              private _userService:UserService) {
  }


  public createOrder(order: Order): Observable<Order> {
    // let userId = this.userService.getUserId();
    let userId = this._userService.getUserId();
    // @ts-ignore
    return this.httpClient.post(this.URL + `${userId}/orders`, order);
  }
}
