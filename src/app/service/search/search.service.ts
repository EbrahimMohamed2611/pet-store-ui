import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Products} from '../../model/Products.model';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = environment.apiUrl + 'search';

  constructor(private httpClient: HttpClient) {
  }

  public searchProducts(name: string, page?: number, pageLimit?: number): Observable<Products> {
    let parameters = new HttpParams().set('q', name);
    if (page !== undefined && pageLimit !== undefined) {
      parameters = parameters.append('page', page.toString()).append('pageLimit', pageLimit.toString());
    }
    return this.httpClient.get<Products>(this.url, {params: parameters});
  }
}
