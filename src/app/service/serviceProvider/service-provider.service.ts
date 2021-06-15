import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/model/Service.model';
import { ServiceProvider } from 'src/app/model/ServiceProvider.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {
  private url = environment.apiUrl + "serviceproviders"

  constructor(private httpClient: HttpClient) { }

  getAllServiceProviders(): Observable<ServiceProvider[]> {
    return this.httpClient.get<ServiceProvider[]>(this.url);
  }

  getServiceProvider(id: number): Observable<ServiceProvider> {
    return this.httpClient.get<ServiceProvider>(this.url + "/" + id);
  }

  getServiceProviderService(id: number): Observable<Service> {
    return this.httpClient.get<Service>(this.url + "/" + id + "/services");
  }

  addNewServiceProvider(serviceProvider: ServiceProvider): Observable<ServiceProvider> {
    return this.httpClient.post<ServiceProvider>(this.url, serviceProvider);
  }

  updateServiceProvider(serviceProvider: ServiceProvider): Observable<ServiceProvider> {
    return this.httpClient.post<ServiceProvider>(this.url + "/" + serviceProvider.id, serviceProvider);
  }

  deleteServiceProvider(id: number): Observable<any> {
    return this.httpClient.delete(this.url + "/" + id);
  }
  deleteAllServiceProviders(): Observable<any> {
    return this.httpClient.delete(this.url);
  }


}
