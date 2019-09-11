/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BymiTestModule } from '../../../test.module';
import { PlacedOrderDetailComponent } from 'app/entities/placed-order/placed-order-detail.component';
import { PlacedOrder } from 'app/shared/model/placed-order.model';

describe('Component Tests', () => {
  describe('PlacedOrder Management Detail Component', () => {
    let comp: PlacedOrderDetailComponent;
    let fixture: ComponentFixture<PlacedOrderDetailComponent>;
    const route = ({ data: of({ placedOrder: new PlacedOrder(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BymiTestModule],
        declarations: [PlacedOrderDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlacedOrderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlacedOrderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.placedOrder).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
