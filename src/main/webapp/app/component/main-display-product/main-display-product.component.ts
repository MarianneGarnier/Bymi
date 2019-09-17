import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/model/product.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'jhi-main-display-product',
  templateUrl: './main-display-product.component.html',
  styleUrls: ['./main-display-product.component.scss']
})
export class MainDisplayProductComponent implements OnInit {
  public product: Product;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const todoId: string = params['id'];
      if (todoId) {
        //TODO: service product by ID
        this.product = new Product(1, 1, 'test01', 15, 'null', 2, null, null);
      } else {
        this.product = { name: 'error', price: 0 };
      }
    });
  }
}
