import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Service} from 'src/app/model/Service.model';
import {environment} from 'src/environments/environment';
import {Services} from '../../model/Services.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url = environment.apiUrl + 'services';
  private mediaTypeJson = 'application/json';

  constructor(private httpClient: HttpClient) {
  }

  getAllServices(page?: number, pageLimit?: number, minPrice?: number, maxPrice?: number): Observable<Services> {
    let parameters = new HttpParams();
    if (page !== undefined && pageLimit !== undefined) {
      parameters = parameters.set('page', page.toString()).append('pageLimit', pageLimit.toString());
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
      parameters = parameters.append('price.lt', minPrice.toString()).append('price.gt', maxPrice.toString());
    }
    return this.httpClient.get<Services>(this.url, {params: parameters});
  }

  getServicesByType(serviceTypeId: number, page?: number, pageLimit?: number, minPrice?: number, maxPrice?: number): Observable<Services> {
    let parameters = new HttpParams().set('serviceTypeId', serviceTypeId.toString());
    if (page !== undefined && pageLimit !== undefined) {
      parameters = parameters.append('page', page.toString()).append('pageLimit', pageLimit.toString());
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
      parameters = parameters.append('price.lt', minPrice.toString()).append('price.gt', maxPrice.toString());
    }
    return this.httpClient.get<Services>(this.url, {params: parameters});
  }

  getService(id: number): Observable<Service> {
    return this.httpClient.get<Service>(this.url + '/' + id);
  }

  addNewService(service: Service, image: File): Observable<Service> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('service', new Blob([JSON.stringify(service)], {type: this.mediaTypeJson}));
    return this.httpClient.post<Service>(this.url, formData);
  }

  updateService(service: Service, image?: File): Observable<Service> {
    const formData: FormData = new FormData();
    if (image !== undefined) {
      formData.append('image', image);
    }
    formData.append('service', new Blob([JSON.stringify(service)], {type: this.mediaTypeJson}));
    return this.httpClient.put<Service>(this.url + '/' + service.id, formData);
  }

  deleteService(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  deleteAllServices(): Observable<any> {
    return this.httpClient.delete(this.url);
  }


}
