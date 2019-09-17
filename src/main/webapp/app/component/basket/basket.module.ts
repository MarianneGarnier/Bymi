import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BymiSharedModule } from '../../shared';
import { BASKET_ROUTE } from './basket.route';
import { BasketComponent } from './basket.component';
import { BymiCoreModule } from '../../core';
import { BymiHomeModule } from 'app/home/home.module';

@NgModule({
  declarations: [BasketComponent],
  imports: [CommonModule, RouterModule.forChild([BASKET_ROUTE]), BymiCoreModule, BymiSharedModule, BymiHomeModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasketModule {}
