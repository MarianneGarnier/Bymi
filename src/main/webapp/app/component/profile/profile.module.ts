import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PROFILE_ROUTE } from './profile.route';
import { ProfileComponent } from './profile.component';
import { BymiSharedModule } from '../../shared';
@NgModule({
  imports: [BymiSharedModule, CommonModule, RouterModule.forChild([PROFILE_ROUTE])],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule {}
