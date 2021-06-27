import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../../model/Customer.model";
import {Observable} from "rxjs";
import {ContactUs} from "../../model/ContactUs.model";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private url = environment.apiUrl + 'customers';

  constructor(private httpClient: HttpClient) { }


  contactUs(contactUs: ContactUs): Observable<any> {
    return this.httpClient.post<any>(this.url+"/contact-us", contactUs);
  }

}
