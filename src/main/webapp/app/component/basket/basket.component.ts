import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { IPlacedOrder, OrderStatus, PlacedOrder } from 'app/shared/model/placed-order.model';
import { IOrderLine, OrderLine } from 'app/shared/model/order-line.model';
import { JhiAlertService } from 'ng-jhipster';
import { SearchService } from 'app/search/search.service';

@Component({
  selector: 'jhi-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public order: PlacedOrder = null;
  public orderLines: OrderLine[];

  constructor(protected jhiAlertService: JhiAlertService, private search: SearchService) {}

  ngOnInit() {
    this.getBasket();
  }

  async getBasket() {
    await this.search.getReservedOrderLinesOfCurrentUser().then((res: HttpResponse<OrderLine[]>) => (this.orderLines = res.body));
  }
}
