import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
  currentSearch: string;

  constructor(
    protected placedOrderService: PlacedOrderService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.placedOrderService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IPlacedOrder[]>) => res.ok),
          map((res: HttpResponse<IPlacedOrder[]>) => res.body)
        )
        .subscribe((res: IPlacedOrder[]) => (this.placedOrders = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.placedOrderService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlacedOrder[]>) => res.ok),
        map((res: HttpResponse<IPlacedOrder[]>) => res.body)
      )
      .subscribe(
        (res: IPlacedOrder[]) => {
          this.placedOrders = res;
          this.currentSearch = '';
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
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
