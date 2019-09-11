import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlacedOrder } from 'app/shared/model/placed-order.model';
import { PlacedOrderService } from './placed-order.service';

@Component({
  selector: 'jhi-placed-order-delete-dialog',
  templateUrl: './placed-order-delete-dialog.component.html'
})
export class PlacedOrderDeleteDialogComponent {
  placedOrder: IPlacedOrder;

  constructor(
    protected placedOrderService: PlacedOrderService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.placedOrderService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'placedOrderListModification',
        content: 'Deleted an placedOrder'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-placed-order-delete-popup',
  template: ''
})
export class PlacedOrderDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ placedOrder }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlacedOrderDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.placedOrder = placedOrder;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/placed-order', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/placed-order', { outlets: { popup: null } }]);
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
