import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BymiSharedModule } from 'app/shared';
import {
  CustomUserComponent,
  CustomUserDetailComponent,
  CustomUserUpdateComponent,
  CustomUserDeletePopupComponent,
  CustomUserDeleteDialogComponent,
  customUserRoute,
  customUserPopupRoute
} from './';

const ENTITY_STATES = [...customUserRoute, ...customUserPopupRoute];

@NgModule({
  imports: [BymiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CustomUserComponent,
    CustomUserDetailComponent,
    CustomUserUpdateComponent,
    CustomUserDeleteDialogComponent,
    CustomUserDeletePopupComponent
  ],
  entryComponents: [CustomUserComponent, CustomUserUpdateComponent, CustomUserDeleteDialogComponent, CustomUserDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BymiCustomUserModule {}
