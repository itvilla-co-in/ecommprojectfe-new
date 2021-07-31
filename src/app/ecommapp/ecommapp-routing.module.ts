import { Injector, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
 import { EcommapphomeComponent } from './ecommapphome/ecommapphome.component';
import { OrderhistroyComponent } from './ecommapphome/orderhistroy/orderhistroy.component';
import { ProductlistComponent } from './ecommapphome/productlist/productlist.component';
 import { LoginComponent } from './ecommapphome/login/login.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { ProddetailsComponent } from './ecommapphome/proddetails/proddetails.component';
import { CartdetailsComponent } from './ecommapphome/cartdetails/cartdetails.component';
import { ItvillacheckoutComponent } from './ecommapphome/itvillacheckout/itvillacheckout.component';



const routes: Routes = [
   
  
  //{ path: '', component: EcommapphomeComponent},
  //{path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/callback', component: OktaCallbackComponent}, 
  {path: 'ecomm/category/:id', component: ProductlistComponent},
  {path: 'ecomm/search/:value', component: ProductlistComponent},
  {path: 'ecomm/orderhistory', component: OrderhistroyComponent},
  {path: 'ecomm/itvillacart', component: CartdetailsComponent},
  {path: 'ecomm/checkout', component: ItvillacheckoutComponent},
  {path: 'ecomm/products/:id', component: ProddetailsComponent},
  {path: '', component: ProductlistComponent},
  {path: '**', redirectTo: 'ecomm'}

 ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ecommRoutingModule { }
