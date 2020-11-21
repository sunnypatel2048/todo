import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor(
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let username = 'sunny';
    // let password = 'patel';
    // let basicAuthHeaderSring = 'Basic ' + window.btoa(username + ':' + password);

    let basicAuthHeaderSring = this.basicAuthenticationService.getAuthenticatedToken();
    let username = this.basicAuthenticationService.getAuthenticatedUser();

    if (basicAuthHeaderSring && username) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderSring
        }
      });
    }
    return next.handle(request);
  }
}
