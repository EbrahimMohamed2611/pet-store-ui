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

  constructor(private _productService: ProductService, private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoryService.getAllCategory().subscribe(categories => this.categories = categories, error => console.log(error.message));
    this._productService.getProducts().subscribe(products => this.products = products, error => console.log(error.message));
  }

  displayCategoryProducts(categoryId: number): void {
    this._categoryService.getCategoryProducts(categoryId).subscribe(products => this.products = products, error => console.log(error.message));
  }

}
