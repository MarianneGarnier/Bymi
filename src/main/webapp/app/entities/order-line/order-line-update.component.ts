import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IOrderLine, OrderLine } from 'app/shared/model/order-line.model';
import { OrderLineService } from './order-line.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { IPlacedOrder } from 'app/shared/model/placed-order.model';
import { PlacedOrderService } from 'app/entities/placed-order';

@Component({
  selector: 'jhi-order-line-update',
  templateUrl: './order-line-update.component.html'
})
export class OrderLineUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProduct[];

  placedorders: IPlacedOrder[];

  editForm = this.fb.group({
    id: [],
    quantity: [],
    date: [],
    status: [],
    orderlines: [],
    order: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected orderLineService: OrderLineService,
    protected productService: ProductService,
    protected placedOrderService: PlacedOrderService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ orderLine }) => {
      this.updateForm(orderLine);
    });
    this.productService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduct[]>) => response.body)
      )
      .subscribe((res: IProduct[]) => (this.products = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.placedOrderService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlacedOrder[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlacedOrder[]>) => response.body)
      )
      .subscribe((res: IPlacedOrder[]) => (this.placedorders = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(orderLine: IOrderLine) {
    this.editForm.patchValue({
      id: orderLine.id,
      quantity: orderLine.quantity,
      date: orderLine.date != null ? orderLine.date.format(DATE_TIME_FORMAT) : null,
      status: orderLine.status,
      orderlines: orderLine.orderlines,
      order: orderLine.order
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const orderLine = this.createFromForm();
    if (orderLine.id !== undefined) {
      this.subscribeToSaveResponse(this.orderLineService.update(orderLine));
    } else {
      this.subscribeToSaveResponse(this.orderLineService.create(orderLine));
    }
  }

  private createFromForm(): IOrderLine {
    return {
      ...new OrderLine(),
      id: this.editForm.get(['id']).value,
      quantity: this.editForm.get(['quantity']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      status: this.editForm.get(['status']).value,
      orderlines: this.editForm.get(['orderlines']).value,
      order: this.editForm.get(['order']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderLine>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }

  trackPlacedOrderById(index: number, item: IPlacedOrder) {
    return item.id;
  }
}
