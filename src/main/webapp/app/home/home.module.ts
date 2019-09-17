import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BymiSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { SmallDisplayProductComponent } from 'app/component/small-display-product/small-display-product.component';
import { ListDisplayProductComponent } from 'app/component/list-display-product/list-display-product.component';
import { DisplayOrderComponent } from '../component/display-order/display-order.component';
import { DisplayOrderLineComponent } from '../component/display-order-line/display-order-line.component';

@NgModule({
  imports: [BymiSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, ListDisplayProductComponent, SmallDisplayProductComponent],
  exports: [SmallDisplayProductComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BymiHomeModule {}
