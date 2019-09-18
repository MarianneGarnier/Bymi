import { IUser } from 'app/core/user/user.model';
import { IOrderLine } from 'app/shared/model/order-line.model';

export interface IProduct {
  id?: number;
  idProduct?: number;
  name?: string;
  price?: number;
  imagePath?: string;
  quantity?: number;
  description?: string;
  user?: IUser;
  orderlines?: IOrderLine[];
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public idProduct?: number,
    public name?: string,
    public price?: number,
    public imagePath?: string,
    public quantity?: number,
    public description?: string,
    public user?: IUser,
    public orderlines?: IOrderLine[]
  ) {}
}
