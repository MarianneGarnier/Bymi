import { Route } from '@angular/router';
import { CreateProductComponent } from 'app/selling/create-product/create-product.component';

export const CREATE_PRODUCT_ROUTE: Route = {
  path: 'createProduct',
  component: CreateProductComponent,
  data: {
    authorities: [],
    pageTitle: 'Create Product Page'
  }
};
