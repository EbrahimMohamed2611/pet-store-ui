import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) {

  }

  public getAllUsers(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}` + 'users');
  }

  public getUserId(): number {
    const TOKEN = localStorage.getItem("token");
    let userId = +this.jwtHelper.decodeToken(TOKEN ? TOKEN : undefined).id;
    return userId;
  }
}
