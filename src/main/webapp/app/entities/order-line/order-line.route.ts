import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrderLine } from 'app/shared/model/order-line.model';
import { OrderLineService } from './order-line.service';
import { OrderLineComponent } from './order-line.component';
import { OrderLineDetailComponent } from './order-line-detail.component';
import { OrderLineUpdateComponent } from './order-line-update.component';
import { OrderLineDeletePopupComponent } from './order-line-delete-dialog.component';
import { IOrderLine } from 'app/shared/model/order-line.model';

@Injectable({ providedIn: 'root' })
export class OrderLineResolve implements Resolve<IOrderLine> {
  constructor(private service: OrderLineService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrderLine> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OrderLine>) => response.ok),
        map((orderLine: HttpResponse<OrderLine>) => orderLine.body)
      );
    }
    return of(new OrderLine());
  }
}

export const orderLineRoute: Routes = [
  {
    path: '',
    component: OrderLineComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrderLines'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrderLineDetailComponent,
    resolve: {
      orderLine: OrderLineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrderLines'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrderLineUpdateComponent,
    resolve: {
      orderLine: OrderLineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrderLines'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrderLineUpdateComponent,
    resolve: {
      orderLine: OrderLineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrderLines'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const orderLinePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrderLineDeletePopupComponent,
    resolve: {
      orderLine: OrderLineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrderLines'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
