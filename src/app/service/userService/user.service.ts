import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) {

  }

  public getAllUsers(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}` + 'users');
  }

}
