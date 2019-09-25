import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  redirectToHomePage() {
    this.router.navigateByUrl('/');
  }
}
