import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs/Subject';
import { FirebaseService } from '../services/firebase.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  places: any;
  id: any;
  startAt: string;
  endAt: string;
  constructor(private router: Router,
    public auth: AuthService,
    private placeService: FirebaseService) { 
      this.places;    
      this.id;  
    }

  ngOnInit() {
    $('#search-btn, #closeBtn').on('click', function () {
      $('body').toggleClass('search-form-on');
    });    
  }
  onChange($event) {
    let q = $event.target.value
    console.log(q);
    this.startAt = q;
    this.endAt = q+"\uf8ff";
    this.placeService.searchPlaces(this.startAt,this.endAt).subscribe(results =>{
      this.places = results; 
      this.id = results;
    })            
  }
  search(){
    console.log(this.id[0].payload.doc.id);
    this.router.navigate(['/hotel/'+ this.id[0].payload.doc.id]);
  }
}
