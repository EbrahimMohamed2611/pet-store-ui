import {Component, Input, OnInit} from '@angular/core';
import {Product} from 'src/app/model/Product.model';
import {ShoppingCartService} from '../../service/shoppingCart/shopping-cart.service';
import {ToastrService} from 'ngx-toastr';
import {CartItem} from '../../model/CartItem.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input('product-item') product: Product;


  constructor(private shoppingCartService: ShoppingCartService,
              private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    console.log('Product Component');
  }

  public addProductToShoppingCart(product: Product, quantity: number) {
    console.log('Before sending To Server ', product, 'Quantity ', quantity);
    this.shoppingCartService.addProductToShoppingCart(product, quantity).subscribe((cartItems: CartItem[]) => {
      console.log(cartItems);
      cartItems.forEach(items => {
        if (items.product.id == product.id) {
          this.toasterService.info('your cart has ' + items.quantity + ' from ' + items.product.name);
        }
      });

    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.toasterService.error(error.message);
    });
  }
}
