import { Component, OnInit } from '@angular/core';
import {CartItem} from '../../model/CartItem.model';
import {ShoppingCartService} from '../../service/shoppingCart/shopping-cart.service';
import {ToastrService} from 'ngx-toastr';
import {Product} from '../../model/Product.model';
import {HttpErrorResponse} from '@angular/common/http';
import {CartService} from "../../service/cart/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public cartItems: CartItem[] = [];

  constructor(private shoppingCartService: CartService,
              private toasterService: ToastrService) {
  }

  ngOnInit(): void {

  }


  public getShoppingCart(): void {
    this.shoppingCartService.getShoppingCartForUser().subscribe((cartItems: CartItem[]) => {
      this.cartItems = cartItems;
      console.log(cartItems);
    }, (error: HttpErrorResponse) => {
      this.toasterService.error(error.message);
    });
  }

  public removeItemFromShoppingCart(productId: number): void {
    this.shoppingCartService.removeItemFromShoppingCart(productId).subscribe((cartItems: CartItem[]) => {
      this.cartItems = cartItems;
      console.log(cartItems);
    }, (error: HttpErrorResponse) => {
      this.toasterService.error(error.message);
    });

  }


}
