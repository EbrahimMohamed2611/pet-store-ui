import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CartItem} from "../../model/CartItem.model";
import {Product} from "../../model/Product.model";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private URL = environment.apiUrl + 'customers/';

  constructor(private httpClient: HttpClient,
              private _userService:UserService) {
  }

  public getShoppingCartForUser(): Observable<CartItem[]> {

    // let userId = this.userService.getUserId();
    let userId = this._userService.getUserId();
    // @ts-ignore
    return this.httpClient.get(this.URL + `${userId}/shoppingCart/`);
  }

  public updateShoppingCart(product: Product, quantity: number): Observable<CartItem[]> {
    // let userId = this.userService.getUserId();
    let userId = this._userService.getUserId();
    // @ts-ignore
    return this.httpClient.put(this.URL + `${userId}/shoppingCart/?quantity=` + `${quantity}`, product);
  }

  public removeItemFromShoppingCart(productId:number): Observable<CartItem[]> {
    // let userId = this.userService.getUserId();
    let userId = this._userService.getUserId();
    // @ts-ignore
    return this.httpClient.delete(this.URL + `${userId}/shoppingCart/?productId=`+productId);

  }
}
