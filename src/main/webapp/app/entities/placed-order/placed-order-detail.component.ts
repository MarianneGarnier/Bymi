import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlacedOrder } from 'app/shared/model/placed-order.model';

@Component({
  selector: 'jhi-placed-order-detail',
  templateUrl: './placed-order-detail.component.html'
})
export class PlacedOrderDetailComponent implements OnInit {
  placedOrder: IPlacedOrder;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ placedOrder }) => {
      this.placedOrder = placedOrder;
    });
  }

  previousState() {
    window.history.back();
  }
}
