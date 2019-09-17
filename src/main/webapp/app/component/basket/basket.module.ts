import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BASKET_ROUTE } from './basket.route';
import { BasketComponent } from './basket.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([BASKET_ROUTE])],
  declarations: [BasketComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasketModule {}
