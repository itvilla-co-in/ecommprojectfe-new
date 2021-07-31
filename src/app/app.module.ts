import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EcommappModule } from './ecommapp/ecommapp.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EcommapphomeComponent } from './ecommapp/ecommapphome/ecommapphome.component';
import myAppConfig from './ecommapp/ecommapphome/config/my-app-config';
import { Router } from '@angular/router';
import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './ecommapp/services/tokeninterceptor';
  
const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth, injector) => {
    const router = injector.get(Router);

    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

@NgModule({
  declarations: [
    AppComponent
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EcommappModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OktaAuthModule 
  ],
//  providers: [{provide: OKTA_CONFIG, useValue: myAppConfig.oidc}],
providers: [{provide: OKTA_CONFIG, useValue: myAppConfig.oidc},
{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
