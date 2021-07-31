import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommapphomeComponent } from './ecommapphome/ecommapphome.component';
import { ecommRoutingModule } from './ecommapp-routing.module';
import { SearchcompComponent } from './ecommapphome/searchcomp/searchcomp.component';
import { LoginComponent } from './ecommapphome/login/login.component';
import { CartComponent } from './ecommapphome/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductcategorylistComponent } from './ecommapphome/productcategorylist/productcategorylist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderhistroyComponent } from './ecommapphome/orderhistroy/orderhistroy.component';
import { LoggedinComponent } from './ecommapphome/loggedin/loggedin.component';
import { ProductlistComponent } from './ecommapphome/productlist/productlist.component';
import { ProddetailsComponent } from './ecommapphome/proddetails/proddetails.component';
import { CartdetailsComponent } from './ecommapphome/cartdetails/cartdetails.component';
import { ItvillacheckoutComponent } from './ecommapphome/itvillacheckout/itvillacheckout.component';
 
 



@NgModule({
  declarations: [EcommapphomeComponent, SearchcompComponent, LoginComponent, CartComponent, ProductcategorylistComponent, OrderhistroyComponent, LoggedinComponent, ProductlistComponent, ProddetailsComponent, CartdetailsComponent, ItvillacheckoutComponent],
  imports: [
    CommonModule,
    ecommRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  //providers: [{provide: OKTA_CONFIG, useValue: myAppConfig.oidc}],
  exports: [EcommapphomeComponent]
})
export class EcommappModule { }
