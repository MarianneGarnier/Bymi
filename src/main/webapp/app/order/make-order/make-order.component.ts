import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, AccountService, User } from 'app/core';
import { SearchService } from './../../search/search.service';
import { HttpResponse } from '@angular/common/http';
import { IProduct } from 'app/shared/model/product.model';

// TODO ajouter entitée panier de l'utilisateur

@Component({
  selector: 'jhi-start-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {
  account: Account;
  user: User;
  userAuthenticated = false;
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    // this.user = UserService.;
    console.log('Hello ngOnInit makeordercomponent');
    // make order available iff the user is authenticated
    this.accountService.identity().then((account: Account) => {
      this.account = account;
      this.userAuthenticated = this.accountService.isAuthenticated();
      const promise: Promise<HttpResponse<IProduct>> = this.searchService.findUserByLogin(this.account.login);
      promise.then((res: HttpResponse<IProduct>) => {
        this.user = res.body;
      });
    });
  }

  public submitOrder() {
    console.log('Hello orderNextStepFillInformation');
    this.router.navigateByUrl('order/confirmation');
  }
}
