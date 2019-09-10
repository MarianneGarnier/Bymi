import { IOrderLine } from 'app/shared/model/order-line.model';
import { IUser } from 'app/core/user/user.model';

export interface IProduct {
  id?: number;
  productId?: number;
  name?: string;
  price?: number;
  imagePath?: string;
  quantity?: number;
  products?: IOrderLine[];
  seller?: IUser;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public productId?: number,
    public name?: string,
    public price?: number,
    public imagePath?: string,
    public quantity?: number,
    public products?: IOrderLine[],
    public seller?: IUser
  ) {}
}
