import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html'
})
export class HotelComponent implements OnInit {

  createReviewForm: FormGroup;
  orderForm: FormGroup;
  item: any;
  comment$: Array<any>;

  constructor(
    private fb: FormBuilder,
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.auth.user$.subscribe(
          (user) =>  this.createOrder(user.uid)
        )
        this.getReviews(this.item.id);
      }
      this.createReview();
    })
  }

  createOrder(uid) {
    this.orderForm = this.fb.group({
      uid: uid,
      time: new FormControl(),
      room: new FormControl(),
      day: new FormControl(),
      hid: this.item.id,
    });
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
  
  onOrder(value){
    this.firebaseService.createOrder(value)
    .then (
      res => {
        window.location.reload();
      }
    )
  }
}
