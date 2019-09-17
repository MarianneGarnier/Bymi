import { Route } from '@angular/router';
import { MainDisplayProductComponent } from './main-display-product.component';

export const PRODUCT_ROUTE: Route = {
  path: 'viewProduct/:id',
  component: MainDisplayProductComponent,
  data: {
    authorities: [],
    pageTitle: 'Product Page'
  }
};
