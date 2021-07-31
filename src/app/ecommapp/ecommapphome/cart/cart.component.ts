import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../../services/cartservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  
  constructor(private cartservice: CartserviceService) { }

  ngOnInit(): void {

    this.cartservice.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartservice.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

}
