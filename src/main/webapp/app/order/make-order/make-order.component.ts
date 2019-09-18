import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, AccountService, IUser, User } from 'app/core';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    //this.user = UserService.;
    console.log('Hello ngOnInit makeordercomponent');

    this.accountService.identity().then((account: Account) => {
      this.account = account;
      const promise: Promise<HttpResponse<IProduct>> = this.searchService.findUserByLogin(this.account.login);
      promise.then((res: HttpResponse<IProduct>) => {
        this.user = res.body;
      });
    });
  }

  public confirmOrder() {
    console.log('Hello orderNextStepFillInformation');
    this.router.navigateByUrl('order/confirmation');
  }
}
