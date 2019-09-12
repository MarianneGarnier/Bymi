import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'app/shared/model/product.model';

@Component({
  selector: 'jhi-small-display-product',
  templateUrl: './small-display-product.component.html',
  styleUrls: ['./small-display-product.component.scss']
})
export class SmallDisplayProductComponent implements OnInit {
  @Input() public product: Product;

  constructor() {}

  ngOnInit() {}
}
