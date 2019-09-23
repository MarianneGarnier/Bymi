import { Component, OnInit } from '@angular/core';
import { User } from '../../core';

@Component({
  selector: 'jhi-profil',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  date: String;
  constructor() {}

  ngOnInit() {
    this.user = new User(
      1,
      'sacha56',
      'Sacha',
      'Cargenl',
      'sacha@outlook.fr',
      null,
      null,
      null,
      null,
      new Date(2002, 5, 12),
      null,
      null,
      '1234'
    );
    let tempDate = this.user.createdDate;
    this.date = tempDate.getDay() + '/' + tempDate.getMonth() + '/' + tempDate.getFullYear();
  }
}
