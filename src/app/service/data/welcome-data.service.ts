import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

export class  HelloWorldBean {
  constructor(public message: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
  }

  executeHelloWorldServiceWithPath(name) {
    // let basicAuthHeaderSring = this.createBasicAuthenticationHttpHeader();
  
    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderSring
    // })

    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`,
    // {headers}
    );
  }

  createBasicAuthenticationHttpHeader() {
    let username =  'sunny';
    let password = 'patel';
    let basicAuthHeaderSring = 'Basic ' + window.btoa(username + ':' + password);
    return basicAuthHeaderSring;
  }

}