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
  pages: number;

  constructor(private _productService: ProductService, private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoryService.getAllCategory().subscribe(categories => this.categories = categories, error => console.log(error.message));
    this._productService.getProducts().subscribe(response => {
      this.products = response.products;
      this.pages = response.numberOfPages;
    }
      , error => console.log(error.message));
  }

  displayCategoryProducts(categoryId: number): void {
    this._productService.getCategoryProducts(categoryId).subscribe(response => {
      this.products = response.products;
      this.pages = response.numberOfPages;
    }, error => console.log(error.message));
  }

}
