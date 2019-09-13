import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ProductService } from 'app/entities/product';
import { Product, IProduct } from 'app/shared/model/product.model';
import { Component, OnInit, Input } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() id: number;
  public product: Product = new Product();

  constructor(protected jhiAlertService: JhiAlertService, private productService: ProductService) {}

  ngOnInit() {
    this.searchById(this.id);
  }
  searchById(id: number) {
    this.productService
      .find(this.id)
      .pipe(
        filter((res: HttpResponse<IProduct>) => res.ok),
        map((res: HttpResponse<IProduct>) => res.body)
      )
      .subscribe(
        (res: IProduct) => {
          this.product = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
