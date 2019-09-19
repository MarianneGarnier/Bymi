import { Route } from '@angular/router';
import { ProfileComponent } from './profile.component';

export const PROFILE_ROUTE: Route = {
  path: 'profile',
  component: ProfileComponent,
  data: {
    authorities: [],
    pageTitle: 'Profile de TODO'
  }
};
