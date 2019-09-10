/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BymiTestModule } from '../../../test.module';
import { PlacedOrderComponent } from 'app/entities/placed-order/placed-order.component';
import { PlacedOrderService } from 'app/entities/placed-order/placed-order.service';
import { PlacedOrder } from 'app/shared/model/placed-order.model';

describe('Component Tests', () => {
  describe('PlacedOrder Management Component', () => {
    let comp: PlacedOrderComponent;
    let fixture: ComponentFixture<PlacedOrderComponent>;
    let service: PlacedOrderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BymiTestModule],
        declarations: [PlacedOrderComponent],
        providers: []
      })
        .overrideTemplate(PlacedOrderComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlacedOrderComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlacedOrderService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PlacedOrder(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.placedOrders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
