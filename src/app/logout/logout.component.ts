import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private hardcodedAuthenticationService : HardcodedAuthenticationService,
    private router: Router,
    private basicAuthenticationService : BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    this.basicAuthenticationService.logout();
    this.router.navigate(['login']);
  }

}
