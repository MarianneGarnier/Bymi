import { Component, Input, OnInit } from '@angular/core';
import { Product, IProduct } from '../../shared/model/product.model';
import { PlacedOrder, OrderStatus } from 'app/shared/model/placed-order.model';
import { OrderLine, OrderLineStatus } from 'app/shared/model/order-line.model';
import { HttpResponse } from '@angular/common/http';
import { SearchService } from 'app/search/search.service';
import { User, IUser } from 'app/core/user/user.model';
import * as moment from 'moment';

@Component({
  selector: 'jhi-small-display-product',
  templateUrl: './small-display-product.component.html',
  styleUrls: ['./small-display-product.component.scss']
})
export class SmallDisplayProductComponent implements OnInit {
  @Input() public product: Product;

  constructor(public search: SearchService) {}

  ngOnInit() {}

  async addProductFromListToBasket() {
    let productFromdDB: Product;
    let orders: PlacedOrder[];
    let basket: PlacedOrder = null;
    let orderLineToAdd: OrderLine = null;
    const currentUser: User = await this.search.getCurrentUser().then((res: HttpResponse<IUser>) => res.body);

    await this.search.findProductById(this.product.id).then((res: HttpResponse<IProduct>) => {
      productFromdDB = res.body;
    });
    if (productFromdDB.quantity > 0) {
      await this.search.findOrdersByUser().then((res: HttpResponse<PlacedOrder[]>) => (orders = res.body));

      orders.forEach(order => {
        if (order.status === OrderStatus.BASKET) {
          basket = order;
        }
      });

      if (basket === null) {
        basket = new PlacedOrder(undefined, moment(), Math.round(Math.random() * 10000), OrderStatus.BASKET, undefined, currentUser);
        await this.search.createPlacedOrder(basket).then((res: HttpResponse<PlacedOrder>) => (basket = res.body));
      }

      orderLineToAdd = new OrderLine(undefined, 1, moment(), OrderLineStatus.RESERVED, this.product, basket);
      await this.search.createOrderLine(orderLineToAdd);

      productFromdDB.quantity = productFromdDB.quantity - 1;
      this.search.updateProduct(productFromdDB);
    }
  }
}
