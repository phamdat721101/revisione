import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  Filter: FormGroup;
  destination: any;
  places: any;  
  price: any;
  id_des: any;
  reviews: any;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private placeservice: FirebaseService) { }   
  ngOnInit() {
    this.Filter = this.formBuilder.group({

    });
    this.getPlaces();
    this.getReview();
  }
  getPlaces(){
    this.placeservice.getHotels().subscribe(ref => this.places = ref)
  }
  getReview(){
    this.placeservice.getReview().subscribe(ref => this.reviews = ref);
  }  
}
