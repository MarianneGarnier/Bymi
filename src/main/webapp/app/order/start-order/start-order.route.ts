import { Route } from '@angular/router';
import { StartOrderComponent } from './start-order.component';

export const ORDER_ROUTE: Route = {
  path: 'order',
  component: StartOrderComponent,
  data: {
    authorities: [],
    pageTitle: 'Product Page'
  }
};
