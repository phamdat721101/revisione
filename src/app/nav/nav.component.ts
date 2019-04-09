import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    $('#search-btn, #closeBtn').on('click', function () {
      $('body').toggleClass('search-form-on');
  });
  }
  search(){
    this.router.navigate(["/Search"]);
  }
}
