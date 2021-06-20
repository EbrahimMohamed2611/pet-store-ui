import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/model/Brand.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private url = environment.apiUrl + "brands";

  constructor(private httpClient:HttpClient) { }

  getAllBrands(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(this.url);
  }
}
