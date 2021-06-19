import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product.model';
import { ProductService } from 'src/app/service/product/product.service';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  product: Product;
  selectedTab = 'description';
  // relatedProducts: Product[];

  constructor(private _activatedRoute: ActivatedRoute, private _productService: ProductService) {
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

}
