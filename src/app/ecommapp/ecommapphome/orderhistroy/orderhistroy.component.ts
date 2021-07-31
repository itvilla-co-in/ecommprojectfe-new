import { Component, OnInit } from '@angular/core';
import { OrderHistory } from '../../model/orderhistory';
import { OrderserviceService } from '../../services/orderservice.service';

@Component({
  selector: 'app-orderhistroy',
  templateUrl: './orderhistroy.component.html',
  styleUrls: ['./orderhistroy.component.scss']
})
export class OrderhistroyComponent implements OnInit {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;
  
  constructor(private orderhistory: OrderserviceService) { }
  
  ngOnInit(): void {
    const theEmail = JSON.parse(this.storage.getItem('userEmail'));
    this.orderhistory.getOrderHistory(theEmail).subscribe(
      data => {
        this.orderHistoryList = data._embedded.orders;
      }
    );
  }

}
