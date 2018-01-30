import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from "./store/store.module";
import {RouterModule} from "@angular/router";
import {StoreComponent} from "./store/store.component";
import {CartDetailComponent} from "./store/cart-detail/cart-detail.component";
import {CheckoutComponent} from "./store/checkout/checkout.component";
import { AuthComponent } from './admin/auth/auth.component';
import { AdminComponent } from './admin/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule,
    RouterModule.forRoot([
      {path: "store", component: StoreComponent},
      {path: "cart", component: CartDetailComponent},
      {path: "checkout", component: CheckoutComponent},
      {path: "admin", loadChildren: "app/admin/admin.module#AdminModule"},
      {path: "**", redirectTo: "/store"}
    ])],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
