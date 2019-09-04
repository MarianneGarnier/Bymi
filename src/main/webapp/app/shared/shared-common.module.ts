import { NgModule } from '@angular/core';

import { BymiSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [BymiSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [BymiSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class BymiSharedCommonModule {}
