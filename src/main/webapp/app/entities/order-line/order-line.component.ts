import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderLine } from 'app/shared/model/order-line.model';
import { AccountService } from 'app/core';
import { OrderLineService } from './order-line.service';

@Component({
  selector: 'jhi-order-line',
  templateUrl: './order-line.component.html'
})
export class OrderLineComponent implements OnInit, OnDestroy {
  orderLines: IOrderLine[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected orderLineService: OrderLineService,
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
      this.orderLineService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IOrderLine[]>) => res.ok),
          map((res: HttpResponse<IOrderLine[]>) => res.body)
        )
        .subscribe((res: IOrderLine[]) => (this.orderLines = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.orderLineService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrderLine[]>) => res.ok),
        map((res: HttpResponse<IOrderLine[]>) => res.body)
      )
      .subscribe(
        (res: IOrderLine[]) => {
          this.orderLines = res;
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
    this.registerChangeInOrderLines();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrderLine) {
    return item.id;
  }

  registerChangeInOrderLines() {
    this.eventSubscriber = this.eventManager.subscribe('orderLineListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
