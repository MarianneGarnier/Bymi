import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PlacedOrder } from 'app/shared/model/placed-order.model';
import { PlacedOrderService } from './placed-order.service';
import { PlacedOrderComponent } from './placed-order.component';
import { PlacedOrderDetailComponent } from './placed-order-detail.component';
import { PlacedOrderUpdateComponent } from './placed-order-update.component';
import { PlacedOrderDeletePopupComponent } from './placed-order-delete-dialog.component';
import { IPlacedOrder } from 'app/shared/model/placed-order.model';

@Injectable({ providedIn: 'root' })
export class PlacedOrderResolve implements Resolve<IPlacedOrder> {
  constructor(private service: PlacedOrderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlacedOrder> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PlacedOrder>) => response.ok),
        map((placedOrder: HttpResponse<PlacedOrder>) => placedOrder.body)
      );
    }
    return of(new PlacedOrder());
  }
}

export const placedOrderRoute: Routes = [
  {
    path: '',
    component: PlacedOrderComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlacedOrders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlacedOrderDetailComponent,
    resolve: {
      placedOrder: PlacedOrderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlacedOrders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlacedOrderUpdateComponent,
    resolve: {
      placedOrder: PlacedOrderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlacedOrders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlacedOrderUpdateComponent,
    resolve: {
      placedOrder: PlacedOrderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlacedOrders'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const placedOrderPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlacedOrderDeletePopupComponent,
    resolve: {
      placedOrder: PlacedOrderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlacedOrders'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
