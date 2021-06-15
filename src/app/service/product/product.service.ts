import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Product} from '../../model/Product.model';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private url = environment.apiUrl + 'products';

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
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

}
