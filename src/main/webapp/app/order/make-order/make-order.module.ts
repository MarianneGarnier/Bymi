import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BymiSharedModule } from 'app/shared';

import { ORDER_ROUTE } from './make-order.route';
import { MakeOrderComponent } from './make-order.component';
import { ConfirmOrderComponent } from 'app/order/confirm-order/confirm-order.component';

@NgModule({
  imports: [BymiSharedModule, RouterModule.forChild(ORDER_ROUTE)],
  declarations: [MakeOrderComponent, ConfirmOrderComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MakeOrderModule {}
