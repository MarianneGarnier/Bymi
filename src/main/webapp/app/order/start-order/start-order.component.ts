import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// TODO ajouter entitée panier de l'utilisateur

@Component({
  selector: 'jhi-start-order',
  templateUrl: './start-order.component.html',
  styleUrls: ['./start-order.component.scss']
})
export class StartOrderComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    console.log('Hello ngOnInit');
  }

  public orderNextStepFillInformation() {
    console.log('Hello orderNextStepFillInformation');
  }
}
