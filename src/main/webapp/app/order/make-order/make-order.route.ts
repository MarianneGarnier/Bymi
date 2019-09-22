import { Routes } from '@angular/router';
import { MakeOrderComponent } from './make-order.component';
import { ConfirmOrderComponent } from 'app/order/confirm-order/confirm-order.component';

export const ORDER_ROUTE: Routes = [
  {
    path: 'order/summary',
    component: MakeOrderComponent,
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
