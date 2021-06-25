import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {UserDetails} from "../../model/UserDetails.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {

  }

  public getUsers(): Observable<any> {
    return this.httpClient.get<any>(this.URL + 'users');
  }

  public getAllUsers(): Observable<UserDetails[]> {
    return this.httpClient.get<UserDetails[]>(this.URL + 'users');
  }

  //todo
  public getUserOrder(id: number): Observable<any> {
    return this.httpClient.get<any>(this.URL + 'users');
  }


  // public getUserId(): number {
  //   const TOKEN = localStorage.getItem("token");
  //   let userId = +this.jwtHelper.decodeToken(TOKEN ? TOKEN : undefined).id;
  //   return userId;
  // }
}
