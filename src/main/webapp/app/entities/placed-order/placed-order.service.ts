import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlacedOrder } from 'app/shared/model/placed-order.model';

type EntityResponseType = HttpResponse<IPlacedOrder>;
type EntityArrayResponseType = HttpResponse<IPlacedOrder[]>;

@Injectable({ providedIn: 'root' })
export class PlacedOrderService {
  public resourceUrl = SERVER_API_URL + 'api/placed-orders';

  constructor(protected http: HttpClient) {}

  getOrdersByCurrentUser(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IPlacedOrder[]>(`${this.resourceUrl}/my-orders`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  create(placedOrder: IPlacedOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(placedOrder);
    return this.http
      .post<IPlacedOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(placedOrder: IPlacedOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(placedOrder);
    return this.http
      .put<IPlacedOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlacedOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlacedOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(placedOrder: IPlacedOrder): IPlacedOrder {
    const copy: IPlacedOrder = Object.assign({}, placedOrder, {
      date: placedOrder.date != null && placedOrder.date.isValid() ? placedOrder.date.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((placedOrder: IPlacedOrder) => {
        placedOrder.date = placedOrder.date != null ? moment(placedOrder.date) : null;
      });
    }
    return res;
  }
}
