import { Routes } from '@angular/router';
import { StartOrderComponent } from './start-order.component';
import { ConfirmOrderComponent } from 'app/order/confirm-order/confirm-order.component';

export const ORDER_ROUTE: Routes = [
  {
    path: 'order/summary',
    component: StartOrderComponent,
    data: {
      authorities: [],
      pageTitle: 'Paiement commande'
    }
  },
  {
    path: 'order/confirmation',
    component: ConfirmOrderComponent,
    data: {
      authorities: [],
      pageTitle: 'Confirmation commande'
    }
  }
];
