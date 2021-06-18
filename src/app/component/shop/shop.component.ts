import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/model/Brand.model';
import { Category } from 'src/app/model/Category.model';
import { Product } from 'src/app/model/Product.model';
import { BrandService } from 'src/app/service/brand/brand.service';
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
  brands: Brand[];
  count: number;
  pageLimit = 12;
  page = 1;
  selectedCategory: any;
  selectedBrand: any;
  minPriceSelected: number;
  maxPriceSelected: number;
  math = Math;

  constructor(private _productService: ProductService, private _categoryService: CategoryService, private _brandService: BrandService) { }

  ngOnInit(): void {
    this._categoryService.getAllCategory().subscribe(categories => this.categories = categories, error => console.log(error.message));
    // this._brandService.getAllBrands().subscribe(brands => this.brands = brands, error => console.log(error.message));
    this._productService.getProducts(this.page - 1, this.pageLimit).subscribe(response => {
      this.products = response.products;
      this.count = response.count;
    }
      , error => console.log(error.message));
  }

  applyFilters(): void {
    this.page = 1;
    if (this.selectedCategory == undefined && this.selectedBrand == undefined) {
      this._productService.getProducts(this.page - 1, this.pageLimit, this.minPriceSelected, this.maxPriceSelected).subscribe(response => {
        this.products = response.products;
        this.count = response.count;
      }, error => console.log(error.message));
    } else if (this.selectedCategory != undefined && this.selectedBrand != undefined) {
      this._productService.getProductsByCategoryAndBrand(this.selectedCategory as number, this.selectedBrand as number, this.page - 1, this.pageLimit, this.minPriceSelected, this.maxPriceSelected).subscribe(response => {
        this.products = response.products;
        this.count = response.count;
      }, error => console.log(error.message));
    } else if (this.selectedBrand != undefined) {
      this._productService.getBrandProducts(this.selectedBrand as number, this.page - 1, this.pageLimit, this.minPriceSelected, this.maxPriceSelected).subscribe(response => {
        this.products = response.products;
        this.count = response.count;
      }, error => console.log(error.message));
    } else if (this.selectedCategory != undefined) {
      this._productService.getCategoryProducts(this.selectedCategory as number, this.page - 1, this.pageLimit, this.minPriceSelected, this.maxPriceSelected).subscribe(response => {
        this.products = response.products;
        this.count = response.count;
      }, error => console.log(error.message));
    }
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this._productService.getProducts(this.page - 1, this.pageLimit).subscribe(response => {
      this.products = response.products;
      this.count = response.count;
    }
      , error => console.log(error.message));
  }

  priceValueChanged(): void {
    let minPrice = document.querySelector(".noUi-handle.noUi-handle-lower");
    let maxPrice = document.querySelector(".noUi-handle.noUi-handle-upper");
    this.minPriceSelected = Number(minPrice?.getAttribute("aria-valuenow"));
    this.maxPriceSelected = Number(maxPrice?.getAttribute("aria-valuenow"));
  }

}
