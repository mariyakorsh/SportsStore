import { Component } from '@angular/core';
import {OrderRepository} from "../../model/order.repository";
import {Order} from "../../model/order.model";

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent{
  includeShipped: boolean = false;
  constructor(private repository: OrderRepository) { }
  getOrders(): Order[] {
    return this.repository.getOrders()
      .filter(o => this.includeShipped || !o.shipped);
  }
  markShipped(order: Order): void {
    order.shipped = true;
    this.repository.updateOrder(order);
  }
  delete(id: number): void {
    this.repository.deleteOrder(id);
  }
}
