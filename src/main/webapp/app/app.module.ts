import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { BymiSharedModule } from 'app/shared';
import { BymiCoreModule } from 'app/core';
import { BymiAppRoutingModule } from './app-routing.module';
import { BymiHomeModule } from './home/home.module';
import { BymiAccountModule } from './account/account.module';
import { BymiEntityModule } from './entities/entity.module';
import { BasketModule } from 'app/component/basket/basket.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import { MainDisplayProductModule } from './component/main-display-product/main-display-product.module';
import { OrderListModule } from './component/order-list/order-list.module';
import { SmallDisplayProductComponent } from './component/small-display-product/small-display-product.component';
import { SearchResultComponent } from './component/search-result/search-result.component';
import { SearchResultModule } from './component/search-result/search-result.module';
import { ProfileModule } from './component/profile/profile.module';
@NgModule({
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000
    }),
    BymiSharedModule.forRoot(),
    BymiCoreModule,
    BymiHomeModule,
    BymiAccountModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    BymiEntityModule,
    BasketModule,
    MainDisplayProductModule,
    OrderListModule,
    SearchResultModule,
    BymiAppRoutingModule,
    ProfileModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [JhiMainComponent]
})
export class BymiAppModule {
  constructor(private dpConfig: NgbDatepickerConfig) {
    this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
