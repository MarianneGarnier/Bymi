import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CREATE_PRODUCT_ROUTE } from 'app/selling/create-product/create-product.route';
import { CreateProductComponent } from 'app/selling/create-product/create-product.component';
import { BymiSharedModule } from 'app/shared';

@NgModule({
  imports: [BymiSharedModule, RouterModule.forChild([CREATE_PRODUCT_ROUTE])],
  declarations: [CreateProductComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateProductModule {}
