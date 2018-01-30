import {Injectable} from "@angular/core";
import {Order} from "./order.model";
import {Product} from "./product.model";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map';

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token: string;

  constructor(public http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }
  authenticate(user: string, pass: string): Observable<boolean> {
     let response = this.http.post(this.baseUrl + "login", {name: user, password: pass});
     return response.map(res => {
       let resp = (<any>res);
       let  success = resp.success;
       this.auth_token = success ? resp.token : null;
       console.log(this.auth_token);
       document.cookie = this.auth_token;
       return <boolean> success;
     });
  }
  getProducts(): Observable<Product[]> {
    return this.http.get(this.baseUrl + "products");
  }
  saveProduct(product: Product): Observable<Product> {
    let header = new HttpHeaders();
      this.setAuthHeader(header);
    return this.http.post(this.baseUrl + 'products', product, {headers: header});
  }
  updateProduct(product: Product): Observable<Product> {
    let header = new HttpHeaders();
      this.setAuthHeader(header);
    return this.http.put(this.baseUrl + `products/${product.id}`, product, {headers: header});
  }
  deleteProduct(productId: number): Observable<Product> {
    let header = new HttpHeaders();
    this.setAuthHeader(header);
    return this.http.delete(this.baseUrl + `products/${productId}`, {headers: header});
  }
  getOrders(): Observable<Order[]> {
    return this.http.get(this.baseUrl + 'orders');
  }
  updateOrder(order: Order): Observable<Order> {
    let header = new HttpHeaders();
    this.setAuthHeader(header);
    return this.http.put(this.baseUrl + `orders/${order.id}`, order, {headers: header});
  }
  deleteOrder(orderId: number): Observable<Order> {
    let header = new HttpHeaders();
    this.setAuthHeader(header);
    return this.http.delete(this.baseUrl + `orders/${orderId}`)
  }
  saveOrder(order: Order): Observable<Order> {
    return this.http.post(this.baseUrl + "order", order);
  }

  setAuthHeader(header: HttpHeaders): void {
    if (this.auth_token != null) {
      header.set('Authorization',`Bearer<${this.auth_token}>`);
    }
  }
}
