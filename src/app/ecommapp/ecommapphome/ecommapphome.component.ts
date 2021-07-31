import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-ecommapphome',
  templateUrl: './ecommapphome.component.html',
  styleUrls: ['./ecommapphome.component.scss']
})
export class EcommapphomeComponent implements OnInit {

  isAuthenticated: boolean = false;
  storage: Storage = sessionStorage;

  username: string | undefined;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
  //console.log("coming in ecommhomecomponent");    
    // Subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );

  }
 
  
  
  getUserDetails() {
          // Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
      if(this.isAuthenticated){
      this.oktaAuthService.getUser().then(
        (res) => {
          this.username = res.name;

          // retrieve the user's email from authentication response
          const theEmail = res.email;

          // now store the email in browser storage
          this.storage.setItem('userEmail', JSON.stringify(theEmail));
          //console.log("lets see what okta has "+ JSON.stringify(res));
        }
      );
    }
  }

  
  logout() {
    // Terminates the session with Okta and removes current tokens.
    this.oktaAuthService.signOut();
  }


}
