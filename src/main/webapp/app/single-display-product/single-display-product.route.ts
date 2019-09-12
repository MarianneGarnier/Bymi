import { Route } from '@angular/router';
import {SingleDisplayProductComponent} from "app/single-display-product/single-display-product.component";

export const SINGLEPRODUCT_ROUTE: Route = {
  path: 'product',
  component: SingleDisplayProductComponent,
  data: {
    authorities: [],
    pageTitle: "Produit"
  }
};
