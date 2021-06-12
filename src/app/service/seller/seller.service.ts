import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from 'src/app/model/Seller.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private url = environment.apiUrl + "sellers";

  constructor(private httpClient: HttpClient) { }

  getSellers(): Observable<Seller[]> {
    return this.httpClient.get<Seller[]>(this.url);
  }

  getSeller(id: number): Observable<Seller> {
    return this.httpClient.get<Seller>(this.url + "/" + id);
  }

  getSellerProducts(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + "/" + id + "/products");
  }

  addNewSeller(seller: Seller): Observable<Seller> {
    return this.httpClient.post<Seller>(this.url, seller);
  }

  updateSeller(seller: Seller): Observable<Seller> {
    return this.httpClient.put<Seller>(this.url + "/" + seller.id, seller);
  }

  deleteSeller(id: number): Observable<any> {
    return this.httpClient.delete(this.url + "/" + id);
  }

  deleteSellers(): Observable<any> {
    return this.httpClient.delete(this.url);
  }
}
