import { filter, map } from 'rxjs/operators';
import { IUser } from './../core/user/user.model';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { ProductService } from 'app/entities/product';
import { OrderLineService } from 'app/entities/order-line';
import { UserService, User } from 'app/core';
import { Product, IProduct } from 'app/shared/model/product.model';
import { OrderLine, IOrderLine } from 'app/shared/model/order-line.model';
import { PlacedOrderService } from 'app/entities/placed-order';
import { IPlacedOrder } from 'app/shared/model/placed-order.model';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  @Input() id: number;
  public product: Product;
  public orderLines: OrderLine[];
  public user: User;

  constructor(
    private http: HttpClient,
    protected jhiAlertService: JhiAlertService,
    private productService: ProductService,
    private orderLineService: OrderLineService,
    private userService: UserService,
    private placedOrderService: PlacedOrderService
  ) {}

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
  // let promise: Promise<HttpResponse<IOrderLine[]>> = this.search.getAllOrderLines();
  // promise.then((res: HttpResponse<IOrderLine[]>) => this.orderLines = res.body);
  public getAllOrderLines(): Promise<HttpResponse<IOrderLine[]>> {
    return this.orderLineService.query().toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise< HttpResponse< IPlacedOrder[]>> = this.search.findOrdersByUser();
  // promise.then((res: Promise< HttpResponse< IPlacedOrder[]>> => this.placedOrders = res.body);
  public findOrdersByUser(user: User): Promise<HttpResponse<IPlacedOrder[]>> {
    return this.placedOrderService.query('user=' + user).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promiseC: Promise< HttpResponse< IProduct>> = this .createProduct(null);
  // promiseC .then((res:  HttpResponse< IProduct>) => res.body, error => {console.error(JSON.stringify(error));});
  public createProduct(product: IProduct): Promise<HttpResponse<IProduct>> {
    return this.productService.create(product).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise<HttpResponse<IUser>> = this.search.findUserByLogin();
  // promise.then((res: HttpResponse<IUser>) => this.user = res.body);
  public findUserByLogin(login: string): Promise<HttpResponse<IUser>> {
    return this.userService.find(login).toPromise();
  }

  /*
   * Just a test, delete when not needed
   */
  public testSearchFunctions(login: string) {
    let promiseU: Promise<HttpResponse<IUser>> = this.findUserByLogin(login);
    promiseU.then((res: HttpResponse<IUser>) => {
      this.user = res.body;
      console.log(this.user);
    });
    let promiseO: Promise<HttpResponse<IOrderLine[]>> = this.getAllOrderLines();
    promiseO.then((res: HttpResponse<IOrderLine[]>) => {
      this.orderLines = res.body;
      console.log(this.orderLines);
    });
    let promiseC: Promise<HttpResponse<IProduct>> = this.createProduct(null);
    promiseC.then(
      (res: HttpResponse<IProduct>) => res.body,
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
