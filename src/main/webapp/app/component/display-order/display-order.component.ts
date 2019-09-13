import { Component, Input, OnInit } from '@angular/core';
import { IPlacedOrder, PlacedOrder } from '../../shared/model/placed-order.model';
import { OrderLine } from '../../shared/model/order-line.model';

@Component({
  selector: 'jhi-display-order',
  templateUrl: './display-order.component.html',
  styleUrls: ['./display-order.component.scss']
})
export class DisplayOrderComponent implements OnInit {
  @Input() public order: PlacedOrder;
  orderLines: OrderLine[];

  constructor() {}

  ngOnInit() {
    this.orderLines = this.order.orderlines;
  }
}
