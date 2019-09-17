import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ProductService } from 'app/entities/product';
import { OrderLineService } from 'app/entities/order-line';
import { UserService, User } from 'app/core';
import { Product, IProduct } from 'app/shared/model/product.model';
import { OrderLine, IOrderLine } from 'app/shared/model/order-line.model';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public orderLine: OrderLine[];
  public user: User;

  constructor(
    private http: HttpClient,
    protected jhiAlertService: JhiAlertService,
    private productService: ProductService,
    private orderLineService: OrderLineService,
    private userService: UserService
  ) {}

  public findProductById(id: number): Promise<HttpResponse<IProduct>> {
    return this.productService.find(id).toPromise();
  }

  public getOrdersByUser(user: User) {
    this.orderLineService
      .query('user:' + user)
      .pipe(
        filter((res: HttpResponse<IOrderLine[]>) => res.ok),
        map((res: HttpResponse<IOrderLine[]>) => res.body)
      )
      .subscribe((res: IOrderLine[]) => {
        this.orderLine = res;
      });
  }

  public findUserByLogin(login: string) {
    this.userService
      .find(login)
      .pipe(
        filter((res: HttpResponse<User>) => res.ok),
        map((res: HttpResponse<User>) => res.body)
      )
      .subscribe(
        (res: User) => {
          this.user = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
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
