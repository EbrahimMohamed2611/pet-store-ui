import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../service/shoppingCart/shopping-cart.service';
import { Product } from '../../model/Product.model';
import { CartItem } from '../../model/CartItem.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CartService } from "../../service/cart/cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public cartItems: CartItem[] = [];

  constructor(private shoppingCartService: CartService,
    private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    this.getShoppingCart();
    this.cartItems.sort((a, b) => (a.product.name < b.product.name ? -1 : 1));

  }

  public addProductToShoppingCart(product: Product, quantity: number) {
    this.shoppingCartService.updateShoppingCart(product, quantity).subscribe((response) => {
    }, (error: HttpErrorResponse) => {
      this.toasterService.error(error.message);

    });
  }

  public getShoppingCart(): void {
    this.shoppingCartService.getShoppingCartForUser().subscribe((cartItems: CartItem[]) => {
      this.cartItems = cartItems;
      this.cartItems.sort((a, b) => (a.product.name < b.product.name ? -1 : 1));

    }, (error: HttpErrorResponse) => {
      this.toasterService.error(error.message);
    });
  }

  public increaseQuantity(product: Product, quantity: number): void {
    this.shoppingCartService.updateShoppingCart(product, quantity).subscribe((cartItems: CartItem[]) => {
      this.cartItems = cartItems;
      this.cartItems.sort((a, b) => (a.product.name < b.product.name ? -1 : 1));

    }, (error: HttpErrorResponse) => {
      this.toasterService.error(error.message);
    });
  }

  public decreaseQuantity(product: Product, quantity: number): void {
    this.shoppingCartService.updateShoppingCart(product, quantity).subscribe((cartItems: CartItem[]) => {
      this.cartItems = cartItems;
      this.cartItems.sort((a, b) => (a.product.name < b.product.name ? -1 : 1));

    }, (error: HttpErrorResponse) => {
      this.toasterService.error(error.message);
    });

  }
  public changeQuantity(event: any): void {
    console.log('changeQuantity ' + event.target.value);

  }


  public removeItemFromShoppingCart(productId: number): void {
    this.shoppingCartService.removeItemFromShoppingCart(productId).subscribe((cartItems: CartItem[]) => {
      this.cartItems = cartItems;
      this.cartItems.sort((a, b) => (a.product.name < b.product.name ? -1 : 1));

    }, (error: HttpErrorResponse) => {
      this.toasterService.error(error.message);
    });

  }
}
