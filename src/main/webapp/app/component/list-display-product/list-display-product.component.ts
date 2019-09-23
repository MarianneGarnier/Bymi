import { Component, OnInit } from '@angular/core';
import { IProduct, Product } from 'app/shared/model/product.model';
import { HttpResponse } from '@angular/common/http';
import { SearchService } from 'app/search/search.service';

@Component({
  selector: 'jhi-list-display-product',
  templateUrl: './list-display-product.component.html',
  styleUrls: ['./list-display-product.component.scss']
})
export class ListDisplayProductComponent implements OnInit {
  // TODO: passer cette liste en input et créer un service pour charger une liste de produits depuis le back-end
  products: IProduct[];

  constructor(private search: SearchService) {}

  ngOnInit() {
    const promise: Promise<HttpResponse<IProduct[]>> = this.search.getAllProducts();
    promise.then((res: HttpResponse<IProduct[]>) => (this.products = res.body));

    if (this.products == null || this.products.length < 1) {
      const lorem =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut lacus ac neque varius tincidunt in eget elit. Cras venenatis libero eget justo sodales.';
      const product1 = new Product(1, 1, 'test01', 15, 'null', 2, lorem, null);
      const product2 = new Product(1, 2, 'test02', 16, 'null', 2, lorem, null);
      const product3 = new Product(1, 3, 'test03', 95, 'null', 1, lorem, null);
      this.products = [];
      this.products.push(product1);
      this.products.push(product2);
      this.products.push(product3);
      this.products.push(product1);
      this.products.push(product2);
      this.products.push(product3);
      this.products.push(product1);
      this.products.push(product2);
      this.products.push(product3);
      this.products.push(product1);
      this.products.push(product2);
      this.products.push(product3);
      this.products.push(product1);
      this.products.push(product2);
      this.products.push(product3);
    }
  }
}
