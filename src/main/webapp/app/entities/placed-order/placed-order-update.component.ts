import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IPlacedOrder, PlacedOrder } from 'app/shared/model/placed-order.model';
import { PlacedOrderService } from './placed-order.service';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-placed-order-update',
  templateUrl: './placed-order-update.component.html'
})
export class PlacedOrderUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    date: [],
    orderId: [],
    status: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected placedOrderService: PlacedOrderService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ placedOrder }) => {
      this.updateForm(placedOrder);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(placedOrder: IPlacedOrder) {
    this.editForm.patchValue({
      id: placedOrder.id,
      date: placedOrder.date != null ? placedOrder.date.format(DATE_TIME_FORMAT) : null,
      orderId: placedOrder.orderId,
      status: placedOrder.status,
      user: placedOrder.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const placedOrder = this.createFromForm();
    if (placedOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.placedOrderService.update(placedOrder));
    } else {
      this.subscribeToSaveResponse(this.placedOrderService.create(placedOrder));
    }
  }

  private createFromForm(): IPlacedOrder {
    return {
      ...new PlacedOrder(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      orderId: this.editForm.get(['orderId']).value,
      status: this.editForm.get(['status']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlacedOrder>>) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
