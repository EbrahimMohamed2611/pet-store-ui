import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category.model';
import { Product } from 'src/app/model/Product.model';
import { CategoryService } from 'src/app/service/category/category.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Product[];
  categories: Category[];
  count: number;
  pageLimit = 12;
  page = 1;

  constructor(private _productService: ProductService, private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoryService.getAllCategory().subscribe(categories => this.categories = categories, error => console.log(error.message));
    this._productService.getProducts(this.page - 1, this.pageLimit).subscribe(response => {
      this.products = response.products;
      this.count = response.count;
    }
      , error => console.log(error.message));
  }

  displayCategoryProducts(categoryId: number): void {
    this.page = 1;
    this._productService.getCategoryProducts(categoryId, this.page - 1, 12).subscribe(response => {
      this.products = response.products;
      this.count = response.count;
    }, error => console.log(error.message));
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    console.log('outside');
    this._productService.getProducts(this.page - 1, this.pageLimit).subscribe(response => {
      this.products = response.products;
      this.count = response.count;
      console.log('inside');
    }
      , error => console.log(error.message));
  }

}
