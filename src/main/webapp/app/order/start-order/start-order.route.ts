import { Routes } from '@angular/router';
import { StartOrderComponent } from './start-order.component';

export const ORDER_ROUTE: Routes = [
  {
    path: 'order',
    component: StartOrderComponent,
    data: {
      authorities: [],
      pageTitle: 'Récapitulatif commande'
    }
  }
];
