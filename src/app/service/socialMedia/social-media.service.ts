import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AuthenticationResponse} from "../../model/AuthenticationResponse";
import {SocialMediaToken} from "../../model/SocialMediaToken.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  private API_URL = environment.apiUrl;

  constructor(private _httpClient: HttpClient) { }

  public loginWithFacebook(authToken: SocialMediaToken): Observable<AuthenticationResponse> {
    return this._httpClient.post<AuthenticationResponse>(this.API_URL + "auth/facebook", authToken);
  }
  public loginWithGoogle(idToken: SocialMediaToken): Observable<AuthenticationResponse> {
    return this._httpClient.post<AuthenticationResponse>(this.API_URL + "auth/google", idToken);
  }
}
