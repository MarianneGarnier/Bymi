import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BymiSharedModule } from 'app/shared';

import { ORDER_ROUTE } from './start-order.route';
import { StartOrderComponent } from './start-order.component';
import { ConfirmOrderComponent } from 'app/order/confirm-order/confirm-order.component';

@NgModule({
  imports: [BymiSharedModule, RouterModule.forChild(ORDER_ROUTE)],
  declarations: [StartOrderComponent, ConfirmOrderComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StartOrderModule {}
