import { SearchService } from './../../search/search.service';
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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private search: SearchService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const todoId: string = params['id'];
      console.log(Number(todoId), '');
      console.log(parseInt(todoId), 'parseint');

      if (todoId) {
        // TODO: service product by ID
        this.product = this.search.findProductById(Number(todoId));
        console.info(this.product.name, Number(todoId));
      } else {
        this.product = { name: 'error', price: 0 };
      }
    });
  }
}
