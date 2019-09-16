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

  /*
   ** Not used, can probably be safely deleted
   */
  search(id: any): Observable<any> {
    return this.http.get(SERVER_API_URL + '/products/:{id}', id);
  }

  searchProductById(id: number) {
    this.productService
      .find(this.id)
      .pipe(
        filter((res: HttpResponse<IProduct>) => res.ok),
        map((res: HttpResponse<IProduct>) => res.body)
      )
      .subscribe(
        (res: IProduct) => {
          this.product = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  public searchOrdersByUser(user: User) {
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

  public getUserByLogin(login: string) {
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

  public testSearchFunctions(login: string) {
    this.getUserByLogin(login);
    this.searchOrdersByUser(this.user);
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
