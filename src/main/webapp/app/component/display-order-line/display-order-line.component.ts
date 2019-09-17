import { Component, Input, OnInit } from '@angular/core';
import { OrderLine } from '../../shared/model/order-line.model';
import { Product } from '../../shared/model/product.model';

@Component({
  selector: 'jhi-display-order-line',
  templateUrl: './display-order-line.component.html',
  styleUrls: ['./display-order-line.component.scss']
})
export class DisplayOrderLineComponent implements OnInit {
  @Input() public orderLine: OrderLine;
  orderLineProduct: Product;

  constructor() {}

  ngOnInit() {
    this.orderLineProduct = this.orderLine.product;
  }
}
