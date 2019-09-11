import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';
import { IPlacedOrder } from 'app/shared/model/placed-order.model';

export const enum OrderLineStatus {
  RESERVED = 'RESERVED',
  EXPIRED = 'EXPIRED',
  UNAVAILABLE = 'UNAVAILABLE'
}

export interface IOrderLine {
  id?: number;
  quantity?: number;
  date?: Moment;
  status?: OrderLineStatus;
  product?: IProduct;
  order?: IPlacedOrder;
}

export class OrderLine implements IOrderLine {
  constructor(
    public id?: number,
    public quantity?: number,
    public date?: Moment,
    public status?: OrderLineStatus,
    public product?: IProduct,
    public order?: IPlacedOrder
  ) {}
}
