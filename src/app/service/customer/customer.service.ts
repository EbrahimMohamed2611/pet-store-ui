import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Customer} from '../../model/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }

  public addNewCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${environment.apiUrl}` + 'customers', customer);
  }

}
