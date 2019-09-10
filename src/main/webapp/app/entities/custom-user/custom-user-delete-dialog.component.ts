import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomUser } from 'app/shared/model/custom-user.model';
import { CustomUserService } from './custom-user.service';

@Component({
  selector: 'jhi-custom-user-delete-dialog',
  templateUrl: './custom-user-delete-dialog.component.html'
})
export class CustomUserDeleteDialogComponent {
  customUser: ICustomUser;

  constructor(
    protected customUserService: CustomUserService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.customUserService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'customUserListModification',
        content: 'Deleted an customUser'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-custom-user-delete-popup',
  template: ''
})
export class CustomUserDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ customUser }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CustomUserDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.customUser = customUser;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/custom-user', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/custom-user', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
