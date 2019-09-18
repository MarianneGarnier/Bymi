import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderListModule } from '../order-list/order-list.module';
import { BasketComponent } from '../basket/basket.component';
import { SEARCH_ROUTE } from './search-result.route';
import { SearchResultComponent } from './search-result.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([SEARCH_ROUTE])],
  declarations: [SearchResultComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchResultModule {}
