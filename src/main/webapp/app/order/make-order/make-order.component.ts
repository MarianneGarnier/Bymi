import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// TODO ajouter entitée panier de l'utilisateur

@Component({
  selector: 'jhi-start-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    console.log('Hello ngOnInit');
  }

  public confirmOrder() {
    console.log('Hello orderNextStepFillInformation');
    this.router.navigateByUrl('order/confirmation');
  }
}