import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from './search.service';

@ Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
@ Input()
id: Number;
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
