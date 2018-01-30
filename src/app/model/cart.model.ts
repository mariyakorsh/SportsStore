
import {CartLine} from "./cartLine.model";
import {Product} from "./product.model";
import {Injectable} from "@angular/core";

@Injectable()
export class Cart {
  lines: CartLine[] = [];
  quantity: number = 0;
  cartPrice: number = 0;

  addLine(product: Product, quantity: number = 1): void{
    debugger
    let line = this.lines.find(l => l.product.id == product.id);
    if(line != undefined){
      line.quantity += quantity;
    } else {
      this.lines.push(new CartLine(product, quantity))
    }
    this.recalculate();
  }
  updateQuantity(product: Product, quantity: number): void{
    let line = this.lines.find(l => l.product.id == product.id);
    if(line){
      line.quantity = quantity;
    }
    debugger
    this.recalculate();
  }
  recalculate(): void{
    this.quantity = 0;
    this.cartPrice = 0;
    this.lines.forEach(l => {
      this.quantity += l.quantity;
      this.cartPrice += l.quantity * l.product.price;
    })
  }
  clear(){
    this.quantity = 0;
    this.cartPrice = 0;
    this.lines = [];
  }
  removeLine(product: Product): void{
    let index = this.lines.findIndex(l => l.product.id == product.id);
    this.lines.splice(index, 1);
    this.recalculate();
  }
}
