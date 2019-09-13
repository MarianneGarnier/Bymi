import { Component, Input, OnInit } from '@angular/core';
import { IPlacedOrder, PlacedOrder, OrderStatus } from '../../shared/model/placed-order.model';
import { OrderLine } from '../../shared/model/order-line.model';

@Component({
  selector: 'jhi-display-order',
  templateUrl: './display-order.component.html',
  styleUrls: ['./display-order.component.scss']
})
export class DisplayOrderComponent implements OnInit {
  @Input() public order: PlacedOrder;
  orderLines: OrderLine[];
  public stateBasket = OrderStatus.BASKET;
  public state;

  constructor() {}

  ngOnInit() {
    this.orderLines = this.order.orderlines;
    this.state = this.order.status;
  }
}
