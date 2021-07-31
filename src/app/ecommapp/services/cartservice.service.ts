import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../model/cartitem';
 
@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  
  //when you refresh the page your cart data is lost so we store cart data on 
  // local storage when you refresh we first check if the data is there in storage 
  storage: Storage = sessionStorage;

  constructor() {
      // if the data is there in the storage then load te cart with the storage cart items.
      let data = JSON.parse(this.storage.getItem('cartItems'));
      if (data != null) {
        this.cartItems = data;
        
        this.calcCartTotals();
      }
   }

  addToCart(theCartItem: CartItem) {
    
    //console.log("from service adding")
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    
    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id );
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
        existingCartItem.quantity++;
        //console.log("exisiting cart item from service ");
    }
    else {
       this.cartItems.push(theCartItem);
    }
    this.calcCartTotals();
  }


  calcCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    //console.log("from service total calc" + totalPriceValue + " qty" + totalQuantityValue);

    // store the cart in the local storage
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  
  reduceQty(theCartItem: CartItem) {

     const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id );
      //console.log("from cart serive reduce qty" + itemIndex + this.cartItems[itemIndex].name + this.cartItems[itemIndex].quantity)
      this.cartItems[itemIndex].quantity--;
    if (this.cartItems[itemIndex].quantity === 0) {
      this.remove(theCartItem);
    }
    else {
         this.calcCartTotals();
    }
  }

  remove(theCartItem: CartItem) {

    // we are going to find the index of the cart item in the array
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id );
    // splice will revmoe 
     if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.calcCartTotals();
    }
  }



}
