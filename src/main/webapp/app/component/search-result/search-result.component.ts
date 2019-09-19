import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/model/product.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'jhi-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  public products: Product[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const type: string = params['type'];
      if (type) {
        if (type === 'product') {
          // TODO: service products by termes de recherche
          this.products = [new Product(1, 1, 'test01', 15, 'null', 2, null, null)];
        } else {
          this.products = [{ name: 'error', price: 0 }];
        }
      }
    });
  }
}
