import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
