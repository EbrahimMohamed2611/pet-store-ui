import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../service/category/category.service";
import {Category} from "../../model/Category.model";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../../service/product/product.service";
import {Product} from "../../model/Product.model";
import {Products} from "../../model/Products.model";
import {CartService} from "../../service/cart/cart.service";
import {CartItem} from "../../model/CartItem.model";
import {AuthenticationService} from 'src/app/service/authenticate/authentication.service';
import {Router} from '@angular/router';
import {Rate} from "../../model/Rate.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private categorySize: number = 3;
  private rateSize: number = 3;
  public categories: Category[] = [];
  public categoryProducts: Product[] = [];
  public topRateProducts: Product[] = [];
  public bestOfferProducts: Product[] = [];


  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private shoppingCartService: CartService,
              private notification: ToastrService,
              private _authService: AuthenticationService,
              private _routerService: Router) {
  }

  ngOnInit(): void {
    // this.getTopRatedProducts();
    // this.getTheTopThreeCategory();
    this.getAllProductsInHome();
    // this.getTopOfferProducts();
  }


  private getTheTopThreeCategory(): void {
    this.categoryService.getTheFirstThreeCategories(this.categorySize).subscribe((categories: Category[]) => {
      this.categories = categories;
    }, (error: HttpErrorResponse) => {
      this.notification.error(error.error.message)
    })

  }

  public getCategoryProducts(categoryId: number): void {
    this.productService.getCategoryProducts(categoryId).subscribe((products: Products) => {
      this.categoryProducts = products.products;
      this.bestOfferProducts = products.products;
      this.topRateProducts = products.products;
      this.bestOfferProducts.sort((a, b) => (a.discount < b.discount ? -1 : 1));
      this.topRateProducts.sort((a, b) => (this.getAverageRate(a.rates) < this.getAverageRate(b.rates) ? -1 : 1));
    }, (error: HttpErrorResponse) => {
      this.notification.error(error.error.message)
    })
  }

  public getAllProductsInHome(): void {
    this.productService.getProducts().subscribe((products: Products) => {
      this.categoryProducts = products.products;
      this.bestOfferProducts = products.products;
      this.topRateProducts = products.products;

      this.bestOfferProducts.sort((a, b) => (a.discount < b.discount ? -1 : 1));
      this.topRateProducts.sort((a, b) => (this.getAverageRate(a.rates) < this.getAverageRate(b.rates) ? -1 : 1));

    }, (error: HttpErrorResponse) => {
      this.notification.error(error.error.message)
    })
  }

  public addToShoppingCart(product: Product): void {
    if (!this._authService.isLoggedIn()) {
      this._routerService.navigateByUrl("/login");
    } else {

      this.shoppingCartService.updateShoppingCart(product, 1)
        .subscribe((cartItems: CartItem[]) => {
          console.log("cartItems ", cartItems)
          cartItems.forEach(items => {
            if (items.product.id == product.id) {
              this.notification.info('your cart has ' + items.quantity + ' from ' + items.product.name);
            }
          });
        }, (error: HttpErrorResponse) => {
          // console.error("error " ,error)
          this.notification.error(error.error.message)
        });
    }
  }

  private getTopRatedProducts(): void {
    this.productService.getTopRatedProducts(this.rateSize).subscribe((response: Products) => {
      this.topRateProducts = response.products;
      console.log("getTopRatedProducts ", response);
    }, (error: HttpErrorResponse) => {
      this.notification.error(error.error.message)
    })
  }

  private getTopOfferProducts(): void {
    this.productService.getSpecialOffersProducts(this.rateSize).subscribe((res: Products) => {
      this.bestOfferProducts = res.products;
      console.log("getTopOfferProducts ", res);
    }, (error: HttpErrorResponse) => {
      this.notification.error(error.error.message)
    })
  }

  public getAverageRate(rates: Rate[]): number {
     let number = Math.floor(rates.map(rate => {

      return rate.rateNumber
    }).reduce((b, c) => {
      return +(b + c);
    }, 0) / rates.length);
     return Number.isNaN(number) ? 0 :number;
  }
}
