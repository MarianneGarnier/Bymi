import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BymiSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { SearchComponent } from 'app/search/search.component';

@NgModule({
  imports: [BymiSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, SearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BymiHomeModule {}
