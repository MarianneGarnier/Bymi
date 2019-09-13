import { Route } from '@angular/router';
import { OrderListComponent } from './order-list.component';

export const ORDERS_ROUTE: Route = {
  path: 'orderList',
  component: OrderListComponent,
  data: {
    authorities: [],
    pageTitle: 'Mes Commandes'
  }
};
