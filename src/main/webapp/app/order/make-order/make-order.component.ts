import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, AccountService, User } from 'app/core';
import { SearchService } from './../../search/search.service';
import { HttpResponse } from '@angular/common/http';
import { IProduct } from 'app/shared/model/product.model';
import { OrderStatus, PlacedOrder } from 'app/shared/model/placed-order.model';
import { OrderLine } from 'app/shared/model/order-line.model';
import { PlacedOrderService } from 'app/entities/placed-order';

@Component({
  selector: 'jhi-start-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {
  account: Account;
  user: User;
  userAuthenticated = false;
  payments = ['VISA', 'MASTERCARD', 'GB'];
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  allPlacedOrderOfUser: PlacedOrder[];
  userCurrentBasket: PlacedOrder;
  orderLine: OrderLine;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private searchService: SearchService,
    private placedOrderService: PlacedOrderService
  ) {}

  ngOnInit() {
    // this.user = UserService.;
    console.log('Hello ngOnInit makeordercomponent');
    // make order available iff the user is authenticated
    this.accountService.identity().then((account: Account) => {
      this.account = account;
      this.userAuthenticated = this.accountService.isAuthenticated();
    });
  }

  submitOrder() {
    const promise: Promise<HttpResponse<IProduct>> = this.searchService.findUserByLogin(this.account.login);
    promise.then((res: HttpResponse<IProduct>) => {
      this.user = res.body; // Récupération de l'utilisateur connecté (qui passe sa commande)
      this.placedOrderService.query().subscribe(firstResponsePlacerOrderService => {
        // Récupération des placedOrder de la BDD
        if (firstResponsePlacerOrderService.status === 200) {
          this.allPlacedOrderOfUser = firstResponsePlacerOrderService.body.filter(placedOrder => {
            if (placedOrder.user !== null) {
              return placedOrder.user.id === this.user.id && placedOrder.status === OrderStatus.BASKET; // Récupération du basket de l'utilisateur actuel
            }
          });
          this.userCurrentBasket = this.allPlacedOrderOfUser[this.allPlacedOrderOfUser.length - 1];
          this.userCurrentBasket.status = OrderStatus.PAID; // Mise à jour de son statut (le panier devient une commande)
          this.placedOrderService.update(this.userCurrentBasket).subscribe(secondResponsePlacedOrderService => {
            if (secondResponsePlacedOrderService.status === 200) {
              // Mise à jour dans la base
              this.router.navigateByUrl('order/confirmation'); // Succès
            }
          });
        }
      });
    });
  }
}
