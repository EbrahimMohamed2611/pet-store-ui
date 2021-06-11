import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {

  }

  public login(credential: User): Observable<any> {
    return this.httpClient.post<User>(`${environment.apiUrl}` + 'authenticate', credential);
  }

  public logOut() {
    localStorage.removeItem('token');
  }


  public isLoggedIn() {

  }
}
