import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
  searchPlace(value: any){
    this.router.navigate(["/Search"]);
  }
  searchEvent(value: any){
    this.router.navigate(["/Search"]);
  }

}
