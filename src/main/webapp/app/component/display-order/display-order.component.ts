import { Component, Input, OnInit } from '@angular/core';
import { IPlacedOrder, PlacedOrder, OrderStatus } from '../../shared/model/placed-order.model';
import { OrderLine } from '../../shared/model/order-line.model';

@Component({
  selector: 'jhi-display-order',
  templateUrl: './display-order.component.html',
  styleUrls: ['./display-order.component.scss']
})
export class DisplayOrderComponent implements OnInit {
  @Input() public orderLines: OrderLine[];
  public stateBasket = OrderStatus.BASKET;
  public order: PlacedOrder;
  status: String;
  labelType: String;

  constructor() {}

  ngOnInit() {
    this.order = this.orderLines[0].order;
    switch (this.order.status) {
      case OrderStatus.BASKET: {
        this.status = 'Panier';
        break;
      }
      case OrderStatus.PAID: {
        this.status = 'Commande payée';
        this.labelType = 'badge badge-warning';
        break;
      }
      case OrderStatus.DELIVERED: {
        this.status = 'Commande livrée';
        this.labelType = 'badge badge-success';
        break;
      }
      case OrderStatus.IN_TRANSIT: {
        this.status = 'Commande en cours de livraison';
        this.labelType = 'badge badge-info';
        break;
      }
    }
  }
}
