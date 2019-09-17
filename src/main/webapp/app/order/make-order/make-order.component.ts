import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, AccountService } from 'app/core';

// TODO ajouter entitée panier de l'utilisateur

@Component({
  selector: 'jhi-start-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {
  account: Account;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private accountService: AccountService) {}

  ngOnInit() {
    //this.user = UserService.;
    console.log('Hello ngOnInit makeordercomponent');

    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
  }

  public confirmOrder() {
    console.log('Hello orderNextStepFillInformation');
    this.router.navigateByUrl('order/confirmation');
  }
}
