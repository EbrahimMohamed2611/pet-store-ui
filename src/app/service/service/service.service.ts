import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/model/Service.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url = environment.apiUrl + "services"

  constructor(private httpClient: HttpClient) { }

  getAllServices(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(this.url);
  }

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


}
