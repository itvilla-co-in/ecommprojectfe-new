import { Component, OnInit } from '@angular/core';
import myAppConfig, {  } from "../config/my-app-config";
import { Router, NavigationStart} from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  widget: any;
 

  

  constructor(
    private oktaauthservice: OktaAuthService
    ) {
      
      this.widget = new OktaSignIn({
        logo: 'assets/images/logo.png',
        features: {
          registration: true
        },
        baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
        clientId: myAppConfig.oidc.clientId,
        redirectUri: myAppConfig.oidc.redirectUri,
        authParams: {
          pkce: true,
          issuer: myAppConfig.oidc.issuer,
          scopes: myAppConfig.oidc.scopes
        }
      });
  }

  ngOnInit(): void {
    console.log("coming in login");
    this.widget.remove();

       this.widget.renderEl({
      el: '#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html
      (response) => {
        if (response.status === 'SUCCESS') {
          this.oktaauthservice.signInWithRedirect();
        }
      },
      (error) => {
        throw error;
      }
    );

  }
}
