import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/Category.model';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {Product} from '../../model/Product.model';
import {CartService} from '../../service/cart/cart.service';
import {CartItem} from '../../model/CartItem.model';
import {AuthenticationService} from 'src/app/service/authenticate/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Rate} from '../../model/Rate.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public categories: Category[] = [];
  public categoryProducts: Product[] = [];
  public topRateProducts: Product[] = [];
  public bestOfferProducts: Product[] = [];

  constructor(private shoppingCartService: CartService,
              private notification: ToastrService,
              private _authService: AuthenticationService,
              private route: ActivatedRoute,
              private _routerService: Router) {
  }

  ngOnInit(): void {
    this.topRateProducts = this.route.snapshot.data.topRates;
    this.categoryProducts = this.route.snapshot.data.products;
    this.bestOfferProducts = this.route.snapshot.data.topOffers;
    this.categories = this.route.snapshot.data.topCategories;
  }

  public addToShoppingCart(product: Product): void {
    if (!this._authService.isLoggedIn()) {
      this._routerService.navigateByUrl('/login');
    } else {

      this.shoppingCartService.updateShoppingCart(product, 1)
        .subscribe((cartItems: CartItem[]) => {
          console.log('cartItems', cartItems);
          cartItems.forEach(items => {
            if (items.product.id == product.id) {
              this.notification.info('your cart has ' + items.quantity + ' from ' + items.product.name);
            }
          });
        }, (error: HttpErrorResponse) => {
          // console.error("error " ,error)
          this.notification.error(error.error.message);
        });
    }
  }

  getAvgRate(rates: Rate[]): number {
    if (rates !== undefined && rates !== null) {
      const rating = Math.floor(rates.map(rate => rate.rateNumber).reduce((p, c) => p + c, 0) / rates.length);
      return Number.isNaN(rating) ? 0 : rating;
    } else {
      return 0;
    }
  }
}
