import { Component, OnInit } from '@angular/core';
import { OrderStatus, PlacedOrder } from '../../shared/model/placed-order.model';
import { OrderLine, OrderLineStatus } from '../../shared/model/order-line.model';
import { Product } from '../../shared/model/product.model';

@Component({
  selector: 'jhi-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orderList: PlacedOrder[];
  orderLine: OrderLine;
  orderLine2: OrderLine;
  order: PlacedOrder;
  order2: PlacedOrder;
  order3: PlacedOrder;
  constructor() {}

  ngOnInit() {
    this.orderLine = new OrderLine(1, 2, null, OrderLineStatus.RESERVED, new Product(1, 1, 'product1', 15, 'null', 2, null, null));
    this.orderLine2 = new OrderLine(2, 1, null, OrderLineStatus.EXPIRED, new Product(2, 2, 'product2', 85, 'null', 1, null, null));

    this.order = new PlacedOrder(56, null, 56, OrderStatus.BASKET, [this.orderLine, this.orderLine2], null);
    this.order2 = new PlacedOrder(58, null, 58, OrderStatus.IN_TRANSIT, [this.orderLine2, this.orderLine, this.orderLine], null);
    this.order3 = new PlacedOrder(
      45,
      null,
      45,
      OrderStatus.DELIVERED,
      [this.orderLine2, this.orderLine, this.orderLine, this.orderLine],
      null
    );
    this.orderList = [this.order, this.order2, this.order3];
  }
}
