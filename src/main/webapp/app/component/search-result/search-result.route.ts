import { Route } from '@angular/router';
import { SearchResultComponent } from './search-result.component';

export const SEARCH_ROUTE: Route = {
  path: 'search/:type/:word',
  component: SearchResultComponent,
  data: {
    authorities: [],
    pageTitle: 'Recherche'
  }
};
