/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BymiTestModule } from '../../../test.module';
import { OrderLineDeleteDialogComponent } from 'app/entities/order-line/order-line-delete-dialog.component';
import { OrderLineService } from 'app/entities/order-line/order-line.service';

describe('Component Tests', () => {
  describe('OrderLine Management Delete Component', () => {
    let comp: OrderLineDeleteDialogComponent;
    let fixture: ComponentFixture<OrderLineDeleteDialogComponent>;
    let service: OrderLineService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BymiTestModule],
        declarations: [OrderLineDeleteDialogComponent]
      })
        .overrideTemplate(OrderLineDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderLineDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderLineService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
