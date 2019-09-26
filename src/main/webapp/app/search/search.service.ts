import { PlacedOrder } from './../shared/model/placed-order.model';
import { IUser } from './../core/user/user.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { ProductService } from 'app/entities/product';
import { OrderLineService } from 'app/entities/order-line';
import { UserService, User, AccountService } from 'app/core';
import { Product, IProduct } from 'app/shared/model/product.model';
import { OrderLine, IOrderLine } from 'app/shared/model/order-line.model';
import { PlacedOrderService } from 'app/entities/placed-order';
import { IPlacedOrder } from 'app/shared/model/placed-order.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  @Input() id: number;
  public product: Product;
  public orderLines: OrderLine[];
  public placedOrders: PlacedOrder[];
  public user: User;

  constructor(
    private http: HttpClient,
    protected jhiAlertService: JhiAlertService,
    private productService: ProductService,
    private orderLineService: OrderLineService,
    private userService: UserService,
    private placedOrderService: PlacedOrderService,
    private accountService: AccountService
  ) {}

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise< HttpResponse< IProduct>> = this .createProduct();
  // promise .then((res:  HttpResponse< IProduct>) => action if ok, error => {console.error(JSON.stringify(error));});
  public createProduct(product: IProduct): Promise<HttpResponse<IProduct>> {
    return this.productService.create(product).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise< HttpResponse< IProduct>> = this .updateProduct();
  // promise .then((res:  HttpResponse< IProduct>) => action if ok, error => {console.error(JSON.stringify(error));});
  public updateProduct(product: Product) {
    return this.productService.update(product).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise<HttpResponse<IProduct>> = this.search.findProductById();
  // promise.then((res: HttpResponse<IProduct>) => {this.product = res.body;});
  public findProductById(id: number): Promise<HttpResponse<IProduct>> {
    return this.productService.find(id).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise< HttpResponse< IProduct[]>> = this.search.getAllProducts();
  // promise.then((res: Promise< HttpResponse< IProduct[]>>) => this.products = res.body);
  public getAllProducts(requestOption?: any): Promise<HttpResponse<IProduct[]>> {
    return this.productService.query(requestOption).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise< HttpResponse< IOrderLine>> = this .createOrderLine();
  // promise .then((res:  HttpResponse< IOrderLine>) => action if ok, error => {console.error(JSON.stringify(error));});
  public createOrderLine(orderLine: OrderLine): Promise<HttpResponse<IOrderLine>> {
    return this.orderLineService.create(orderLine).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise< HttpResponse< IOrderLine>> = this .createOrderLine();
  // promise .then((res:  HttpResponse< IOrderLine>) => action if ok, error => {console.error(JSON.stringify(error));});
  public updateOrderLine(orderLine: OrderLine): Promise<HttpResponse<IOrderLine>> {
    return this.orderLineService.update(orderLine).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise< HttpResponse< IOrderLine[]>> = this .getOrderLinesFromOrderId();
  // promise .then((res:  HttpResponse< IOrderLine[]>) => action if ok, error => {console.error(JSON.stringify(error));});
  public getOrderLinesFromOrderId(id: number): Promise<HttpResponse<IOrderLine[]>> {
    return this.placedOrderService.getOrderLinesFromOrder(id).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise<HttpResponse<IOrderLine[]>> = this.search.getAllOrderLines();
  // promise.then((res: HttpResponse<IOrderLine[]>) => this.orderLines = res.body);
  public getAllOrderLines(): Promise<HttpResponse<IOrderLine[]>> {
    return this.orderLineService.query().toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise< HttpResponse< IPlacedOrder>> = this .createPlacedOrder();
  // promise .then((res:  HttpResponse< IPlacedOrder>) => action if ok, error => {console.error(JSON.stringify(error));});
  public createPlacedOrder(placedOrder: PlacedOrder): Promise<HttpResponse<IPlacedOrder>> {
    return this.placedOrderService.create(placedOrder).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise< HttpResponse< IPlacedOrder>> = this .updatePlacedOrder();
  // promise .then((res:  HttpResponse< IPlacedOrder>) => action if ok, error => {console.error(JSON.stringify(error));});
  public updatePlacedOrder(placedOrder: PlacedOrder): Promise<HttpResponse<IPlacedOrder>> {
    return this.placedOrderService.update(placedOrder).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise< HttpResponse< IPlacedOrder[]>> = this.search.findOrdersByUser();
  // promised.then((res:  HttpResponse< IPlacedOrder[]>) => this.placedOrders = res.body);
  public findOrdersByUser(): Promise<HttpResponse<IPlacedOrder[]>> {
    return this.placedOrderService.getOrdersByCurrentUser().toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise<HttpResponse<IUser>> = this.search.findUserByLogin();
  // promise.then((res: HttpResponse<IUser>) => this.user = res.body);
  public findUserByLogin(login: string): Promise<HttpResponse<IUser>> {
    return this.userService.find(login).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise<HttpResponse<IUser>> = this.search.getCurrentUser();
  // promise.then((res: HttpResponse<IUser>) => this.user = res.body);
  public getCurrentUser(): Promise<HttpResponse<IUser>> {
    return this.accountService.fetch().toPromise();
  }

  public getReservedOrderLinesOfCurrentUser(): Promise<HttpResponse<OrderLine[]>> {
    return this.orderLineService.getOrderLinesByCurrentUserBasket().toPromise();
  }

  public testquery(str: string) {
    const promise: Promise<HttpResponse<IUser>> = this.findUserByLogin(str);
    promise.then((res: HttpResponse<IUser>) => (this.user = res.body));
    const promised: Promise<HttpResponse<IPlacedOrder[]>> = this.findOrdersByUser();
    promised.then((res: HttpResponse<IPlacedOrder[]>) => (this.placedOrders = res.body));
    let userToCreateProduct: User;
    const promiseU: Promise<HttpResponse<IUser>> = this.getCurrentUser();
    promiseU.then((res: HttpResponse<IUser>) => (userToCreateProduct = res.body));
    const promisec: Promise<HttpResponse<IProduct>> = this.createProduct(
      new Product(undefined, 6969, 'prod', 1234, undefined, 6, 'zef', userToCreateProduct, undefined)
    );
    promisec.then(
      (res: HttpResponse<IProduct>) => console.log('prod created'),
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
