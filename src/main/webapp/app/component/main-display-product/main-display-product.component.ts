import { SearchService } from './../../search/search.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/model/product.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
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
        const promise: Promise<HttpResponse<IProduct>> = this.search.findProductById(Number(todoId));
        promise.then((res: HttpResponse<IProduct>) => {
          this.product = res.body;
        });
      } else {
        this.product = { name: 'error', price: 0 };
      }
    });
  }
}
