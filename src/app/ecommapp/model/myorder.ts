import { Address } from './address';
import { Customer } from './customer';
import { Order } from './order';
import { OrderItem } from './orderitem';

export class myorder {
    customer: Customer;
    deliveryAddress: Address;
    billingAddress: Address;
    order: Order;
    orderItems: OrderItem[]; 
}
