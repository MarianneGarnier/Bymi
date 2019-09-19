import { Component, OnInit } from '@angular/core';
import { Product } from 'app/shared/model/product.model';

@Component({
  selector: 'jhi-list-display-product',
  templateUrl: './list-display-product.component.html',
  styleUrls: ['./list-display-product.component.scss']
})
export class ListDisplayProductComponent implements OnInit {
  // TODO: passer cette liste en input et créer un service pour charger une liste de produits depuis le back-end
  products: Product[];

  constructor() {}

  ngOnInit() {
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
