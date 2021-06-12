import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../model/User.model';
import {UserSignUp} from '../../model/UserSignUp';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {

  }

  public login(credential: User): Observable<any> {
    return this.httpClient.post<User>(`${environment.apiUrl}` + 'auth/authenticate', credential);
  }

  public signUp(userSignUp: UserSignUp): Observable<any> {
    return this.httpClient.post<UserSignUp>(`${environment.apiUrl}` + 'auth/signUp', userSignUp);
  }

  public logOut() {
    localStorage.removeItem('token');
  }


  public isLoggedIn() {

  }
}
