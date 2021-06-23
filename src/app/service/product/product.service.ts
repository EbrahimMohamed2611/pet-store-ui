import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../model/Product.model';
import { Products } from 'src/app/model/Products.model';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private url = environment.apiUrl + 'products';

  constructor(private httpClient: HttpClient) { }

  getProducts(page?: number, pageLimit?: number, minPrice?: number, maxPrice?: number): Observable<Products> {
    let parameters = new HttpParams();
    if (page != undefined && pageLimit != undefined) {
      parameters = parameters.set('page', page.toString()).append('pageLimit', pageLimit.toString());
    }
    if (minPrice != undefined && maxPrice != undefined) {
      parameters = parameters.append('price.lt', minPrice.toString()).append('price.gt', maxPrice.toString());
    }
    return this.httpClient.get<Products>(this.url, { params: parameters });
  }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }
  


  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.url + '/' + id);
  }

  addNewProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.url + '/' + product.id, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  deleteProducts(): Observable<any> {
    return this.httpClient.delete(this.url);
  }

  getCategoryProducts(categoryId: number, page?: number, pageLimit?: number, minPrice?: number, maxPrice?: number): Observable<Products> {
    let parameters = new HttpParams().set('categoryId', categoryId.toString());
    if (page != undefined && pageLimit != undefined) {
      parameters = parameters.append('page', page.toString()).append('pageLimit', pageLimit.toString());
    }
    if (minPrice != undefined && maxPrice != undefined) {
      parameters = parameters.append('price.lt', minPrice.toString()).append('price.gt', maxPrice.toString());
    }
    return this.httpClient.get<Products>(this.url, { params: parameters });
  }

  getBrandProducts(brandId: number, page?: number, pageLimit?: number, minPrice?: number, maxPrice?: number): Observable<Products> {
    let parameters = new HttpParams().set('brandId', brandId.toString());
    if (page != undefined && pageLimit != undefined) {
      parameters = parameters.append('page', page.toString()).append('pageLimit', pageLimit.toString());
    }
    if (minPrice != undefined && maxPrice != undefined) {
      parameters = parameters.append('price.lt', minPrice.toString()).append('price.gt', maxPrice.toString());
    }
    return this.httpClient.get<Products>(this.url, { params: parameters });
  }

  getProductsByCategoryAndBrand(categoryId: number, brandId: number, page?: number, pageLimit?: number, minPrice?: number, maxPrice?: number): Observable<Products> {
    let parameters = new HttpParams().set('categoryId', categoryId.toString()).append('brandId', brandId.toString());
    if (page != undefined && pageLimit != undefined) {
      parameters = parameters.append('page', page.toString()).append('pageLimit', pageLimit.toString());
    }
    if (minPrice != undefined && maxPrice != undefined) {
      parameters = parameters.append('price.lt', minPrice.toString()).append('price.gt', maxPrice.toString());
    }
    return this.httpClient.get<Products>(this.url, { params: parameters });
  }

  public getTopRatedProducts(rateSize: number): Observable<any> {
    return this.httpClient.get<any>(this.url + `?rateSize=${rateSize}`);
  }

  public getSpecialOffersProducts(size: number): Observable<any> {
    return this.httpClient.get<any>(this.url + `?size=${size}`);
  }

}
