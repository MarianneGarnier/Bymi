import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { PlacedOrderService } from 'app/entities/placed-order';
import { PlacedOrder, IPlacedOrder, OrderStatus } from 'app/shared/model/placed-order.model';
import { OrderLine, OrderLineStatus } from '../../shared/model/order-line.model';
import { Product } from '../../shared/model/product.model';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { UserService, User } from 'app/core';

@Component({
  selector: 'jhi-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  private user: User;
  private orderLine1: OrderLine;
  public order: PlacedOrder;

  constructor(
    protected jhiAlertService: JhiAlertService,
    private placedOrderService: PlacedOrderService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.user = this.userService.getUserWithAuthorities().get();
    this.getBasket(this.user);
  }

  getBasket(user: User) {
    this.orderLine1 = new OrderLine(1, 2, null, OrderLineStatus.RESERVED, new Product(1, 1, 'orderLine1', 15, 'null', 2, null, null));
    this.order = new PlacedOrder(56, null, 56, OrderStatus.BASKET, [this.orderLine1, this.orderLine1], null);
  }
}
