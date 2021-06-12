import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Category} from '../../model/Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  public addNewCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${environment.apiUrl}` + 'categories', category);
  }
  public getCategoryById(categoryId: number): Observable<Category> {
    return this.httpClient.get<Category>(`${environment.apiUrl}` + 'categories/' + categoryId);
  }
  public getAllCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}` + 'categories');
  }

}
