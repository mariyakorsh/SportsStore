
import {Injectable} from "@angular/core";
import {StaticDataSource} from "./static.datasource";
import {Observable} from "rxjs/Observable";
import {Order} from "./order.model";
import {RestDataSource} from "./rest.datasource";

@Injectable()
export class OrderRepository{
  private orders: Order[] = [];
  private loaded: boolean;

  constructor(public dataSource: RestDataSource){}
  loadOrders() {
    this.loaded = true;
    this.dataSource.getOrders().subscribe(o => this.orders = o);
  }
  updateOrder(order: Order) {
    this.dataSource.updateOrder(order).subscribe(o => {
      this.orders.splice(this.orders.findIndex(ord => ord.id==order.id), 1, o);
    })
  }
  getOrders() {
    if(!this.loaded){
      this.loadOrders();
    }
    return this.orders;
  }
  deleteOrder(orderId: number) {
    this.dataSource.deleteOrder(orderId).subscribe(o => {
        this.orders.splice(this.orders.findIndex(ord => ord.id == orderId),1);
    });
  }
  saveOrder(order: Order): Observable<Order>{
    return this.dataSource.saveOrder(order);
  }
}
