import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../model/User.model';
import { UserSignUp } from '../../model/UserSignUp';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  logged = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {

    this.changeLoggedStatus(this.isLoggedIn());
  }

  public authenticate(credential: User): Observable<any> {
    return this.httpClient.post<User>(`${environment.apiUrl}` + 'auth/authenticate', credential);
  }

  public signUp(userSignUp: UserSignUp): Observable<any> {
    return this.httpClient.post<UserSignUp>(`${environment.apiUrl}` + 'customers/signUp', userSignUp);
  }

  public logOut() {
    console.log("from log out " + this.logged)
    localStorage.removeItem('token');
    this.changeLoggedStatus(false);
    console.log("from log out " + this.logged)

  }

  public login(token: string) {
    console.log("from log in " + this.logged)

    localStorage.setItem('token', token);
    this.changeLoggedStatus(true);
    console.log("from log in " + this.logged)

  }


  public isLoggedIn(): boolean {
    const TOKEN = localStorage.getItem("token");
    return TOKEN != null;
  }

  changeLoggedStatus(status: boolean): void {
    this.logged.next(status);
  }

  getLoggedStatus(): Observable<boolean>{
    return this.logged.asObservable();
  }

}
