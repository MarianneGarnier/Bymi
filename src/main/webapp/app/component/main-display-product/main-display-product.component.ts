import { SearchService } from './../../search/search.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product, IProduct } from '../../shared/model/product.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { number } from 'yargs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-main-display-product',
  templateUrl: './main-display-product.component.html',
  styleUrls: ['./main-display-product.component.scss']
})
export class MainDisplayProductComponent implements OnInit {
  public product: Product;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public search: SearchService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const todoId: string = params['id'];
      if (todoId) {
        // TODO: service product by ID
        let promise: Promise<HttpResponse<IProduct>> = this.search.findProductById(Number(todoId));
        promise.then((res: HttpResponse<IProduct>) => {
          this.product = res.body;
        });
      } else {
        this.product = { name: 'error', price: 0 };
      }
    });
  }
}
