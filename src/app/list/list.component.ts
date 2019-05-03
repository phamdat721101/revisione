import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  hotel$: Array<any>;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router) {}

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getHotels()
    .subscribe(result => {
      this.hotel$ = result;
    })
  }

  viewDetails(item){
    this.router.navigate(['/hotel/'+ item.payload.doc.id]);
  }
}
