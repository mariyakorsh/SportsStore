import { Component, OnInit } from '@angular/core';
import {Order} from "../../model/order.model";
import {OrderRepository} from "../../model/order.repository";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  orderSent: boolean = false;
  submitted: boolean = false;

  constructor(public order: Order, public orderRepository: OrderRepository) { }
  submitOrder(form: NgForm){
    this.submitted = true;
    if(form.valid){
      this.orderRepository.saveOrder(this.order).subscribe(o => {
        this.order.clear();
        this.orderSent = true;
        this.submitted = false;
      });
    }
  }
}
