import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
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

  constructor(
    protected orderLineService: OrderLineService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.orderLineService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrderLine[]>) => res.ok),
        map((res: HttpResponse<IOrderLine[]>) => res.body)
      )
      .subscribe(
        (res: IOrderLine[]) => {
          this.orderLines = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
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
