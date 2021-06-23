import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceType } from 'src/app/model/ServiceType.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  constructor(private httpClient: HttpClient) { }


  public getAllServicesTypes(): Observable<ServiceType[]> {
    return this.httpClient.get<ServiceType[]>(`${environment.apiUrl}` + 'categories');
  }

}
