import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BymiSharedModule } from 'app/shared';
import {
  PlacedOrderComponent,
  PlacedOrderDetailComponent,
  PlacedOrderUpdateComponent,
  PlacedOrderDeletePopupComponent,
  PlacedOrderDeleteDialogComponent,
  placedOrderRoute,
  placedOrderPopupRoute
} from './';

const ENTITY_STATES = [...placedOrderRoute, ...placedOrderPopupRoute];

@NgModule({
  imports: [BymiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlacedOrderComponent,
    PlacedOrderDetailComponent,
    PlacedOrderUpdateComponent,
    PlacedOrderDeleteDialogComponent,
    PlacedOrderDeletePopupComponent
  ],
  entryComponents: [PlacedOrderComponent, PlacedOrderUpdateComponent, PlacedOrderDeleteDialogComponent, PlacedOrderDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BymiPlacedOrderModule {}
