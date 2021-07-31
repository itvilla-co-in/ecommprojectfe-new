import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { myorder } from '../model/myorder';
import { OrderHistory } from '../model/orderhistory';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  private myordereUrl = 'http://localhost:8181/api/order/buy';
  private orderhistoryUrl = 'http://localhost:8181/api/orders';

  constructor(private httpClient: HttpClient) { }

  myOrder(order: myorder): Observable<any> {
    return this.httpClient.post<myorder>(this.myordereUrl, order);    
  }
 
  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory> {  
    const orderHistoryUrl = `${this.orderhistoryUrl}/search/findByCustomerEmail?email=${theEmail}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }



}
interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[];
  }
}