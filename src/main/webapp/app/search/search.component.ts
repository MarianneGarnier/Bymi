import { User } from './../core/user/user.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ProductService } from 'app/entities/product';
import { Product, IProduct } from 'app/shared/model/product.model';
import { Component, OnInit, Input } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { OrderLineService } from 'app/entities/order-line';
import { OrderLine, IOrderLine } from 'app/shared/model/order-line.model';
import { UserService } from 'app/core';

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
