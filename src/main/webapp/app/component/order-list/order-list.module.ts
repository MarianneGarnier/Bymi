import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BymiSharedModule } from '../../shared';
import { OrderListComponent } from './order-list.component';
import { ORDERS_ROUTE } from './order-list.route';
import { DisplayOrderComponent } from '../display-order/display-order.component';
import { DisplayOrderLineComponent } from '../display-order-line/display-order-line.component';
import { SmallDisplayProductComponent } from '../small-display-product/small-display-product.component';
import { BymiCoreModule } from '../../core';
import { BymiHomeModule } from '../../home';

@NgModule({
  imports: [BymiSharedModule, BymiHomeModule, RouterModule.forChild([ORDERS_ROUTE]), BymiCoreModule],
  declarations: [OrderListComponent, DisplayOrderComponent, DisplayOrderLineComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrderListModule {}
