import { Route } from '@angular/router';
import { BasketComponent } from './basket.component';

export const BASKET_ROUTE: Route = {
  path: 'basket',
  component: BasketComponent,
  data: {
    authorities: [],
    pageTitle: 'Mon Panier'
  }
};
