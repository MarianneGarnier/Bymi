import { Component, OnInit } from '@angular/core';
import { IUser, UserService } from 'app/core';
import { JhiAlertService } from 'ng-jhipster';
import { ProductService } from 'app/entities/product';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IProduct, Product } from 'app/shared/model/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    idProduct: [],
    name: [],
    price: [],
    imagePath: [],
    quantity: [],
    description: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productService: ProductService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(product: IProduct) {
    this.editForm.patchValue({
      id: product.id,
      idProduct: product.idProduct,
      name: product.name,
      price: product.price,
      imagePath: product.imagePath,
      quantity: product.quantity,
      description: product.description,
      user: product.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id']).value,
      idProduct: this.editForm.get(['idProduct']).value,
      name: this.editForm.get(['name']).value,
      price: this.editForm.get(['price']).value,
      imagePath: this.editForm.get(['imagePath']).value,
      quantity: this.editForm.get(['quantity']).value,
      description: this.editForm.get(['description']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
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
