import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product.model";
import {ProductRepository} from "../../model/product.repository";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent {
  editing: boolean = false;
  product: Product = new Product();
  constructor(private repository: ProductRepository,
              private router: Router,
              private activeRouter: ActivatedRoute)
  {
    this.editing = activeRouter.snapshot.params['mode'] == 'edit';
    if(this.editing) {
      debugger
      Object.assign(this.product, this.repository.getProduct(activeRouter.snapshot.params['id']));
    }
  }
  save(form: NgForm): void {
    this.repository.saveProduct(this.product);
    this.router.navigateByUrl('/admin/main/products');
  }
}
