import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
  searchPlace(value: any){
    this.router.navigate(["/search"]);
  }

}
