import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UserDetails} from '../../model/UserDetails.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string = environment.apiUrl;

  constructor(private httpClient: HttpClient,
              private jwtHelper: JwtHelperService)  {

  }

  public getUsers(): Observable<any> {
    return this.httpClient.get<any>(this.URL + 'users');
  }

  public getAllUsers(): Observable<UserDetails[]> {
    return this.httpClient.get<UserDetails[]>(this.URL + 'users');
  }

  public getUserOrder(id: number): Observable<any> {
    return this.httpClient.get<any>(this.URL + 'users');
  }


  public getUserId(): number {
    const TOKEN = localStorage.getItem('token');
    const userId = +this.jwtHelper.decodeToken(TOKEN ? TOKEN : undefined).id;
    return userId;
  }
}
