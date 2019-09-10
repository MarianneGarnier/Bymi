import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CustomUser } from 'app/shared/model/custom-user.model';
import { CustomUserService } from './custom-user.service';
import { CustomUserComponent } from './custom-user.component';
import { CustomUserDetailComponent } from './custom-user-detail.component';
import { CustomUserUpdateComponent } from './custom-user-update.component';
import { CustomUserDeletePopupComponent } from './custom-user-delete-dialog.component';
import { ICustomUser } from 'app/shared/model/custom-user.model';

@Injectable({ providedIn: 'root' })
export class CustomUserResolve implements Resolve<ICustomUser> {
  constructor(private service: CustomUserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICustomUser> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CustomUser>) => response.ok),
        map((customUser: HttpResponse<CustomUser>) => customUser.body)
      );
    }
    return of(new CustomUser());
  }
}

export const customUserRoute: Routes = [
  {
    path: '',
    component: CustomUserComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CustomUserDetailComponent,
    resolve: {
      customUser: CustomUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CustomUserUpdateComponent,
    resolve: {
      customUser: CustomUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CustomUserUpdateComponent,
    resolve: {
      customUser: CustomUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomUsers'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const customUserPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CustomUserDeletePopupComponent,
    resolve: {
      customUser: CustomUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomUsers'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
