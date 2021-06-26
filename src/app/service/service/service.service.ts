import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/model/Service.model';
import { ServicePage } from 'src/app/model/ServicePage.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url = environment.apiUrl + "services"

  constructor(private httpClient: HttpClient) { }


  getService(id: number): Observable<Service> {
    return this.httpClient.get<Service>(this.url + "/" + id);
  }

  addNewService(service: Service): Observable<Service> {
    return this.httpClient.post<Service>(this.url, service);
  }

  updateService(service: Service): Observable<Service> {
    return this.httpClient.post<Service>(this.url + "/" + service.id, service);
  }

  deleteService(id: number): Observable<any> {
    return this.httpClient.delete(this.url + "/" + id);
  }
  deleteAllServices(): Observable<any> {
    return this.httpClient.delete(this.url);
  }


  getAllServices(page?: number, pageLimit?: number, minPrice?: number, maxPrice?: number): Observable<ServicePage> {
    let parameters = new HttpParams();
    if (page != undefined && pageLimit != undefined) {
      parameters = parameters.set('page', page.toString()).append('pageLimit', pageLimit.toString());
    }
    if (minPrice != undefined && maxPrice != undefined) {
      parameters = parameters.append('price.lt', minPrice.toString()).append('price.gt', maxPrice.toString());
    }
    return this.httpClient.get<ServicePage>(this.url, { params: parameters });
  }


  getServicesByType(serviceTypeId: number, page?: number, pageLimit?: number, minPrice?: number, maxPrice?: number): Observable<ServicePage> {
    let parameters = new HttpParams().set('serviceTypeId', serviceTypeId.toString());
    if (page != undefined && pageLimit != undefined) {
      parameters = parameters.append('page', page.toString()).append('pageLimit', pageLimit.toString());
    }
    if (minPrice != undefined && maxPrice != undefined) {
      parameters = parameters.append('price.lt', minPrice.toString()).append('price.gt', maxPrice.toString());
    }
    return this.httpClient.get<ServicePage>(this.url, { params: parameters });
  }



}
