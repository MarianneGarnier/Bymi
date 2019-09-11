import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.BymiProductModule)
      },
      {
        path: 'placed-order',
        loadChildren: () => import('./placed-order/placed-order.module').then(m => m.BymiPlacedOrderModule)
      },
      {
        path: 'order-line',
        loadChildren: () => import('./order-line/order-line.module').then(m => m.BymiOrderLineModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BymiEntityModule {}
