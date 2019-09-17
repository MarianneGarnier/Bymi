import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, AccountService, LoginModalService, UserService } from 'app/core';
import { OrderLine, OrderLineStatus } from '../shared/model/order-line.model';
import { Product } from '../shared/model/product.model';
import { OrderStatus, PlacedOrder } from '../shared/model/placed-order.model';
import { SearchService } from 'app/search/search.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private search: SearchService
  ) {}

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }
  test() {
    this.search.testSearchFunctions('admin');
    console.info(this.search.user);
    this.search.orderLine.forEach(function(value) {
      console.info(value.product, value.order);
    });
  }
}
