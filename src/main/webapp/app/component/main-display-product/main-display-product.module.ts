import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BymiSharedModule } from 'app/shared';
import { PRODUCT_ROUTE } from './main-display-product.route';
import { MainDisplayProductComponent } from './main-display-product.component';

@NgModule({
  imports: [BymiSharedModule, RouterModule.forChild([PRODUCT_ROUTE])],
  declarations: [MainDisplayProductComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainDisplayProductModule {}
