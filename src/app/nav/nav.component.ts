import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  constructor(private router: Router,
    public auth: AuthService) { }

  ngOnInit() {
    $('#search-btn, #closeBtn').on('click', function () {
      $('body').toggleClass('search-form-on');
  });
  }
  search(){
    this.router.navigate(["/search"]);
  }
}
