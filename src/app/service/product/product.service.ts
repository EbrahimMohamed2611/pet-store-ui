import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Product} from '../../model/Product.model';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private httpClient: HttpClient) { }

  public addNewProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${environment.apiUrl}` + 'products', product);
  }
  public getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.apiUrl}` + 'products/' + productId);
  }
  public getAllProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.apiUrl}` + 'products');
  }

}
