import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BymiSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [BymiSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [BymiSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BymiSharedModule {
  static forRoot() {
    return {
      ngModule: BymiSharedModule
    };
  }
}
