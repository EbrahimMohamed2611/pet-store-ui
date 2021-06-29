import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Customer} from '../../model/Customer.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = environment.apiUrl + 'customers';

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.url);
  }

  getCustomer(id: number): Observable<Customer> {
    // console.log("the id ",id);
    return this.httpClient.get<Customer>(this.url + '/' + id);
  }

  getCustomerOrders(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + '/' + id + '/orders');
  }

  addNewCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.url, customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(this.url + '/' + customer.id, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  deleteCustomers(): Observable<any> {
    return this.httpClient.delete(this.url);
  }
}
