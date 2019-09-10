/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BymiTestModule } from '../../../test.module';
import { CustomUserComponent } from 'app/entities/custom-user/custom-user.component';
import { CustomUserService } from 'app/entities/custom-user/custom-user.service';
import { CustomUser } from 'app/shared/model/custom-user.model';

describe('Component Tests', () => {
  describe('CustomUser Management Component', () => {
    let comp: CustomUserComponent;
    let fixture: ComponentFixture<CustomUserComponent>;
    let service: CustomUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BymiTestModule],
        declarations: [CustomUserComponent],
        providers: []
      })
        .overrideTemplate(CustomUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomUser(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
