import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/model/product.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'jhi-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  public products: Product[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {}
}
