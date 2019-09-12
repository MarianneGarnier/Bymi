import { Component, OnInit } from '@angular/core';
import {Product} from "app/shared/model/product.model";

@Component({
  selector: 'jhi-single-display-product',
  templateUrl: './single-display-product.component.html',
  styleUrls: ['./single-display-product.component.scss']
})
  constructor() {}
export class SingleDisplayProductComponent implements OnInit {

  product : Product;

  ngOnInit() {}
}
