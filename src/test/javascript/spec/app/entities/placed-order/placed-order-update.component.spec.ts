/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BymiTestModule } from '../../../test.module';
import { PlacedOrderUpdateComponent } from 'app/entities/placed-order/placed-order-update.component';
import { PlacedOrderService } from 'app/entities/placed-order/placed-order.service';
import { PlacedOrder } from 'app/shared/model/placed-order.model';

describe('Component Tests', () => {
  describe('PlacedOrder Management Update Component', () => {
    let comp: PlacedOrderUpdateComponent;
    let fixture: ComponentFixture<PlacedOrderUpdateComponent>;
    let service: PlacedOrderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BymiTestModule],
        declarations: [PlacedOrderUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlacedOrderUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlacedOrderUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlacedOrderService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlacedOrder(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlacedOrder();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
