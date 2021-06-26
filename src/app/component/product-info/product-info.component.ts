import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from 'src/app/model/Product.model';
import {ProductService} from 'src/app/service/product/product.service';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {CartItem} from "../../model/CartItem.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../service/authenticate/authentication.service";
import {CartService} from "../../service/cart/cart.service";

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  firstCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 10,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 10,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      1200: {items: 5},
      992: {items: 4},
      768: {items: 3},
      480: {items: 5},
      380: {items: 4},
      0: {items: 3}
    },
    nav: true
  };
  product: Product;
  selectedTab = 'description';

  // relatedProducts: Product[];

  constructor(private _activatedRoute: ActivatedRoute, private _productService: ProductService,
              private notification: ToastrService,
              private shoppingCartService: CartService,
              private _authService:AuthenticationService,
              private _routerService:Router) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._productService.getProduct(+params['id']).subscribe(product => {
        this.product = product;
        // this._productService.getCategoryProducts(product.category.id).subscribe(products => {
        //   this.relatedProducts = products.products;
        //   let index = this.relatedProducts.indexOf(this.product);
        //   this.relatedProducts.splice(index, 1);
        // });
      });
    });
  }


  public addToShoppingCart(product: Product): void {
    if (!this._authService.isLoggedIn()){
      this._routerService.navigateByUrl("/login");
    }else{

      this.shoppingCartService.updateShoppingCart(product, 1)
        .subscribe((cartItems: CartItem[]) => {
          console.log("cartItems " ,cartItems)
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
}
