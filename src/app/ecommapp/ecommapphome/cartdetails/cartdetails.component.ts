import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../model/cartitem';
import { CartserviceService } from '../../services/cartservice.service';

@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.scss']
})
export class CartdetailsComponent implements OnInit {

  mycartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartservice: CartserviceService) { }

  ngOnInit(): void {

    this.mycartItems = this.cartservice.cartItems;
     this.cartservice.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    
    this.cartservice.totalQuantity.subscribe( 
      data => this.totalQuantity = data
    );
    this.cartservice.calcCartTotals();

  }

  removefromcart(theCartItem: CartItem) {
    this.cartservice.remove(theCartItem);
    //console.log("calling remove");
  }

  incrementQty(theCartItem: CartItem){
    this.cartservice.addToCart(theCartItem);
    //console.log("calling add more");

  }

  reduceQty(theCartItem: CartItem){
    this.cartservice.reduceQty(theCartItem);
   // console.log("calling red");

  }

}
