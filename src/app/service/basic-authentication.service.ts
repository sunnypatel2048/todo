import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN =  'token'
export const AUTHENTICATED_USER = 'authenticatedUser'

export class AuthenticationBean {
  constructor(public message: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  executeAuthenticationService(username, password) {
    let basicAuthHeaderSring = 'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderSring
    })

    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`, { headers })
      .pipe(map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderSring);
          return data;
        }
      ));
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN);
  }

  isUserLoggedIn() {
    return !(this.getAuthenticatedUser() == null);
  }

  logout() {
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(AUTHENTICATED_USER);
  }

}