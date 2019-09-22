import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BASKET_ROUTE } from './basket.route';
import { BasketComponent } from './basket.component';
import { OrderListModule } from 'app/component/order-list/order-list.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([BASKET_ROUTE]), OrderListModule],
  declarations: [BasketComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasketModule {}
