import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../model/CartItem.model';
import { ShoppingCartService } from '../../service/shoppingCart/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../model/Product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from "../../service/cart/cart.service";
import { AuthenticationService } from 'src/app/service/authenticate/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  total:number= 0;
  public cartItems: CartItem[] = [];

  constructor(private shoppingCartService: CartService,
    private toasterService: ToastrService,
    private _authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    // this.logged = this._authenticationService.isLoggedIn();
    // this._authenticationService.getLoggedStatus().subscribe((status) => {
    //   this.isLogged = status;
    //   console.log("status : " + status)
    // }, (error) => {
    //   console.log(error);
    // })

    if (localStorage.getItem("token") != null) {
      this.isLogged = true;
    } else {

      this.isLogged = false;
    }
  }


  public getShoppingCart(): void {
    this.shoppingCartService.getShoppingCartForUser().subscribe((cartItems: CartItem[]) => {
      this.cartItems = cartItems;
      cartItems.forEach((item)=>{
        this.total += item.product.price * item.quantity;
      });
      console.log(cartItems);
    }, (error: HttpErrorResponse) => {
      this.toasterService.error(error.error.message);
    });
  }

  public removeItemFromShoppingCart(productId: number): void {
    this.shoppingCartService.removeItemFromShoppingCart(productId).subscribe((cartItems: CartItem[]) => {
      this.cartItems = cartItems;
      console.log(cartItems);
      cartItems.forEach((item)=>{
        this.total += item.product.price * item.quantity;
      });
    }, (error: HttpErrorResponse) => {
      this.toasterService.error(error.error.message);
    });

  }
  public logOut() {

    this._authenticationService.logOut();
    this.isLogged = false;

  }

  public isLoggin(): boolean {
    return this._authenticationService.isLoggedIn();
  }

}
