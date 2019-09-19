import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, AccountService, User } from 'app/core';
import { SearchService } from './../../search/search.service';
import { HttpResponse } from '@angular/common/http';
import { IProduct, Product } from 'app/shared/model/product.model';
import { OrderStatus, PlacedOrder } from 'app/shared/model/placed-order.model';
import { OrderLine, OrderLineStatus } from 'app/shared/model/order-line.model';
import { PlacedOrderService } from 'app/entities/placed-order';
import * as moment from 'moment';
import { ProductService } from 'app/entities/product';
import { OrderLineService } from 'app/entities/order-line';

// TODO ajouter entitée panier de l'utilisateur

@Component({
  selector: 'jhi-start-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {
  account: Account;
  user: User;
  sellerUser: User;
  userAuthenticated = false;
  payments = ['VISA', 'MASTERCARD', 'GB'];
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  placedOrder: PlacedOrder;
  updatedPlacedOrder: PlacedOrder;
  orderStatus: OrderStatus;
  orderLine: OrderLine;
  orderLineStatus: OrderLineStatus;
  product: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private searchService: SearchService,
    private placedOrderService: PlacedOrderService,
    private productService: ProductService,
    private orderLineService: OrderLineService
  ) {}

  ngOnInit() {
    // this.user = UserService.;
    console.log('Hello ngOnInit makeordercomponent');
    // make order available iff the user is authenticated
    this.accountService.identity().then((account: Account) => {
      this.account = account;
      this.userAuthenticated = this.accountService.isAuthenticated();
      const promise: Promise<HttpResponse<IProduct>> = this.searchService.findUserByLogin(this.account.login);
      promise.then((res: HttpResponse<IProduct>) => {
        this.user = res.body;
        this.sellerUser = new User(4, 'user', 'User', 'User', 'user@localhost', true, 'en', ['ROLE_USER'], 'system', null, 'system', null);
        this.product = new Product(1, 2, 'FakeItem', 666, 'null', 2, null, this.sellerUser);
        this.orderLine = new OrderLine(1, 1, moment('25/12/2016', 'DD/MM/YYYY'), OrderLineStatus.RESERVED, this.product, this.placedOrder);
        this.placedOrder = new PlacedOrder(
          1,
          moment('25/12/2016', 'DD/MM/YYYY'),
          this.user.id,
          OrderStatus.BASKET,
          [this.orderLine],
          this.user
        );
        this.productService.create(this.product).subscribe(responseProductService => {
          if (responseProductService.status === 200) {
            this.orderLineService.create(this.orderLine).subscribe(responseOrderLineService => {
              if (responseOrderLineService.status === 200) {
                this.placedOrderService.create(this.placedOrder);
              }
            });
          }
        });
      });
    });
  }

  public submitOrder() {
    console.log('Hello orderNextStepFillInformation');
    this.placedOrder.status = OrderStatus.PAID;
    this.placedOrderService.update(this.placedOrder).subscribe(firstResponsePlacedOrderService => {
      if (firstResponsePlacedOrderService.status === 200) {
        this.placedOrderService.find(this.user.id).subscribe(secondResponsePlacedOrderService => {
          if (secondResponsePlacedOrderService.status === 200) {
            responsePlacedOrderService => (this.updatedPlacedOrder = responsePlacedOrderService.body);
            console.log(this.updatedPlacedOrder);
          }
        });
      }
    });
    this.router.navigateByUrl('order/confirmation');
  }
}
