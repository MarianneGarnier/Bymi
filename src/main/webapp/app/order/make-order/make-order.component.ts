import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, AccountService, User } from 'app/core';
import { SearchService } from './../../search/search.service';
import { OrderStatus, PlacedOrder } from 'app/shared/model/placed-order.model';
import { OrderLine } from 'app/shared/model/order-line.model';
import { PlacedOrderService } from 'app/entities/placed-order';
import { OrderLineService } from 'app/entities/order-line';

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
  allOrderLineOfCurrentBasket: OrderLine[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private searchService: SearchService,
    private placedOrderService: PlacedOrderService,
    private orderLineService: OrderLineService
  ) {}

  ngOnInit() {
    // this.user = UserService.;
    console.log('Hello ngOnInit makeordercomponent');
    // make order available iff the user is authenticated
    this.accountService.identity().then((account: Account) => {
      this.account = account;
      this.userAuthenticated = this.accountService.isAuthenticated();
      this.placedOrderService.getOrdersByCurrentUser().subscribe(firstResponsePlacedOrderService => {
        // Récupération des placedOrder de la BDD
        if (firstResponsePlacedOrderService.status === 200) {
          this.allPlacedOrderOfUser = firstResponsePlacedOrderService.body.filter(placedOrder => {
            if (placedOrder.user !== null) {
              return placedOrder.status === OrderStatus.BASKET; // Récupération du basket de l'utilisateur actuel
            }
          });
          this.userCurrentBasket = this.allPlacedOrderOfUser[this.allPlacedOrderOfUser.length - 1];
          this.orderLineService.getOrderLinesByCurrentUserBasket().subscribe(firstResponseOrderLineService => {
            // Récupération des orderlines du panier actuel
            if (firstResponseOrderLineService.status === 200) {
              this.allOrderLineOfCurrentBasket = firstResponseOrderLineService.body;
            }
          });
        }
      });
    });
  }

  submitOrder() {
    this.userCurrentBasket.status = OrderStatus.PAID; // Mise à jour de son statut (le panier devient une commande)
    this.placedOrderService.update(this.userCurrentBasket).subscribe(secondResponsePlacedOrderService => {
      if (secondResponsePlacedOrderService.status === 200) {
        // Mise à jour dans la base
        this.router.navigateByUrl('order/confirmation'); // Succès
      }
    });
  }
}
