import { Moment } from 'moment';
import { IOrderLine } from 'app/shared/model/order-line.model';
import { IUser } from 'app/core/user/user.model';

export const enum OrderStatus {
  BASKET = 'BASKET',
  PAID = 'PAID',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED'
}

export interface IPlacedOrder {
  id?: number;
  date?: Moment;
  orderId?: number;
  status?: OrderStatus;
  orderlines?: IOrderLine[];
  user?: IUser;
}

export class PlacedOrder implements IPlacedOrder {
  constructor(
    public id?: number,
    public date?: Moment,
    public orderId?: number,
    public status?: OrderStatus,
    public orderlines?: IOrderLine[],
    public user?: IUser
  ) {}
}
