import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlacedOrder } from 'app/shared/model/placed-order.model';
import { AccountService } from 'app/core';
import { PlacedOrderService } from './placed-order.service';

@Component({
  selector: 'jhi-placed-order',
  templateUrl: './placed-order.component.html'
})
export class PlacedOrderComponent implements OnInit, OnDestroy {
  placedOrders: IPlacedOrder[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected placedOrderService: PlacedOrderService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.placedOrderService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlacedOrder[]>) => res.ok),
        map((res: HttpResponse<IPlacedOrder[]>) => res.body)
      )
      .subscribe(
        (res: IPlacedOrder[]) => {
          this.placedOrders = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlacedOrders();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlacedOrder) {
    return item.id;
  }

  registerChangeInPlacedOrders() {
    this.eventSubscriber = this.eventManager.subscribe('placedOrderListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
