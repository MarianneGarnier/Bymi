import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BymiSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { ProfileModule } from 'app/component/profile/profile.module';
import { CreateProductModule } from 'app/selling/create-product/create-product.module';

@NgModule({
  imports: [BymiSharedModule, RouterModule.forChild([HOME_ROUTE]), ProfileModule, CreateProductModule],
  declarations: [HomeComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BymiHomeModule {}
