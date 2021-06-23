import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CartItem} from '../../model/CartItem.model';
import {environment} from '../../../environments/environment';
import {UserService} from '../userService/user.service';
import {Product} from '../../model/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private URL = environment.apiUrl + 'customers/';

  constructor(private httpClient: HttpClient) {
  }

  public getShoppingCartForUser(): Observable<CartItem[]>{

    // let userId = this.userService.getUserId();
    let userId = 1;
    // @ts-ignore
    return this.httpClient.get(this.URL + `${userId}/shoppingCart/`);
  }

  public addProductToShoppingCart(product: Product, quantity: number): Observable<CartItem[]> {
    // let userId = this.userService.getUserId();
    let userId = 1;
    // @ts-ignore
    return this.httpClient.put(this.URL + `${userId}/shoppingCart/?quantity=` + `${quantity}`, product);
  }
}
