import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICustomUser } from 'app/shared/model/custom-user.model';
import { AccountService } from 'app/core';
import { CustomUserService } from './custom-user.service';

@Component({
  selector: 'jhi-custom-user',
  templateUrl: './custom-user.component.html'
})
export class CustomUserComponent implements OnInit, OnDestroy {
  customUsers: ICustomUser[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected customUserService: CustomUserService,
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
      this.customUserService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<ICustomUser[]>) => res.ok),
          map((res: HttpResponse<ICustomUser[]>) => res.body)
        )
        .subscribe((res: ICustomUser[]) => (this.customUsers = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.customUserService
      .query()
      .pipe(
        filter((res: HttpResponse<ICustomUser[]>) => res.ok),
        map((res: HttpResponse<ICustomUser[]>) => res.body)
      )
      .subscribe(
        (res: ICustomUser[]) => {
          this.customUsers = res;
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
    this.registerChangeInCustomUsers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICustomUser) {
    return item.id;
  }

  registerChangeInCustomUsers() {
    this.eventSubscriber = this.eventManager.subscribe('customUserListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
