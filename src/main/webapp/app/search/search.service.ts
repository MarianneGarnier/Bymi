import { IUser } from './../core/user/user.model';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { ProductService } from 'app/entities/product';
import { OrderLineService } from 'app/entities/order-line';
import { UserService, User } from 'app/core';
import { Product, IProduct } from 'app/shared/model/product.model';
import { OrderLine, IOrderLine } from 'app/shared/model/order-line.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  @Input() id: number;
  public product: Product;
  public orderLine: OrderLine[];
  public user: User;

  constructor(
    private http: HttpClient,
    protected jhiAlertService: JhiAlertService,
    private productService: ProductService,
    private orderLineService: OrderLineService,
    private userService: UserService
  ) {}

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise<HttpResponse<IProduct>> = this.search.findProductById();
  // promise.then((res: HttpResponse<IProduct>) => {this.product = res.body;});
  public findProductById(id: number): Promise<HttpResponse<IProduct>> {
    return this.productService.find(id).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise<HttpResponse<IOrderLine[]>> = this.search.getOrdersByUser();
  // promise.then((res: HttpResponse<IOrderLine[]>) => this.orderLine = res.body);
  public getOrdersByUser(user: User) {
    let promise: Promise<HttpResponse<IOrderLine[]>> = this.orderLineService.query('user:' + user).toPromise();
  }

  // Lines to put in any method that wants to call this one. Do not forget arguments and to rename the service if necessary
  // let promise: Promise<HttpResponse<IUser>> = this.search.findUserByLogin();
  // promise.then((res: HttpResponse<IUser>) => this.user = res.body);
  public findUserByLogin(login: string) {
    let promise: Promise<HttpResponse<IUser>> = this.userService.find(login).toPromise();
  }

  /*
   * Just a test, delete when not needed
   */
  public testSearchFunctions(login: string) {
    this.findUserByLogin(login);
    this.getOrdersByUser(this.user);
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
