import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-order',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  order$: Array<any>;
  user: User;

  constructor(public auth: AuthService,
    public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getOrder();
  }

  getOrder(){
    this.auth.user$.subscribe(user => {
      this.firebaseService.getOrders(user.uid)
      .subscribe(result => {
        this.order$ = result;
      });
    });
  }
}
