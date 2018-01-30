import {Product} from "./product.model";

export class CartLine {
  constructor( public product: Product,public quantity: number){}
  get lineTotal(): number{
    return this.quantity * this.product.price;
  }
}
