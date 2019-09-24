import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { PlacedOrderService } from 'app/entities/placed-order';
import { IPlacedOrder, OrderStatus, PlacedOrder } from 'app/shared/model/placed-order.model';
import { OrderLine } from 'app/shared/model/order-line.model';
import { JhiAlertService } from 'ng-jhipster';
import { User, UserService } from 'app/core';
import { SearchService } from 'app/search/search.service';

@Component({
  selector: 'jhi-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public order: PlacedOrder = null;

  constructor(
    protected jhiAlertService: JhiAlertService,
    private placedOrderService: PlacedOrderService,
    private userService: UserService,
    private search: SearchService
  ) {}

  ngOnInit() {
    this.getBasket();
  }

  getBasket() {
    let placedOrders: PlacedOrder[] = [];
    const promise: Promise<HttpResponse<IPlacedOrder[]>> = this.search.findOrdersByUser();
    promise.then((res: HttpResponse<IPlacedOrder[]>) => (placedOrders = res.body));
    for (const order of placedOrders) {
      if (order.status === OrderStatus.BASKET) {
        this.order = order;
      }
    }
  }
}
