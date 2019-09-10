import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomUser } from 'app/shared/model/custom-user.model';

@Component({
  selector: 'jhi-custom-user-detail',
  templateUrl: './custom-user-detail.component.html'
})
export class CustomUserDetailComponent implements OnInit {
  customUser: ICustomUser;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ customUser }) => {
      this.customUser = customUser;
    });
  }

  previousState() {
    window.history.back();
  }
}
