import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

// import { } from '@types/googlemaps';
// declare let google: any;
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html'
})
export class HotelComponent implements OnInit {

  createReviewForm: FormGroup;
  item: any;
  comment$: Array<any>;

  constructor(
    private fb: FormBuilder,
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.getReviews(this.item.id);
      }
      this.createReview();
    })
  }

  getReviews(id){
    this.firebaseService.getReviews(id)
    .subscribe(result => {
      this.comment$ = result;
    })
  }

  createReview() {
    this.createReviewForm = this.fb.group({
      title: new FormControl(),
      content: new FormControl(),
    });
  }

  onSubmit(value){
    console.log("here");
    this.firebaseService.createReview(value)
    .then (
      res => {
        this.router.navigate(['/hotel/' + this.item.id]);
      }
    )
  }
}
