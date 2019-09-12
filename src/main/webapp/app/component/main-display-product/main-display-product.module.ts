import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BymiSharedModule } from 'app/shared';

import { SmallDisplayProductComponent } from 'app/component/small-display-product/small-display-product.component';
import { ListDisplayProductComponent } from 'app/component/list-display-product/list-display-product.component';
import { HOME_ROUTE, HomeComponent } from '../../home';
import { PRODUCT_ROUTE } from './main-display-product.route';
import { MainDisplayProductComponent } from './main-display-product.component';

@NgModule({
  imports: [BymiSharedModule, RouterModule.forChild([PRODUCT_ROUTE])],
  declarations: [MainDisplayProductComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainDisplayProductModule {}
