import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICustomUser, CustomUser } from 'app/shared/model/custom-user.model';
import { CustomUserService } from './custom-user.service';

@Component({
  selector: 'jhi-custom-user-update',
  templateUrl: './custom-user-update.component.html'
})
export class CustomUserUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected customUserService: CustomUserService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ customUser }) => {
      this.updateForm(customUser);
    });
  }

  updateForm(customUser: ICustomUser) {
    this.editForm.patchValue({
      id: customUser.id
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const customUser = this.createFromForm();
    if (customUser.id !== undefined) {
      this.subscribeToSaveResponse(this.customUserService.update(customUser));
    } else {
      this.subscribeToSaveResponse(this.customUserService.create(customUser));
    }
  }

  private createFromForm(): ICustomUser {
    return {
      ...new CustomUser(),
      id: this.editForm.get(['id']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomUser>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
