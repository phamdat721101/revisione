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
    var displayName: any;
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.auth.user$.subscribe(
          user =>  {
            this.createOrder(user.uid);
            this.createReview(user.displayName)
          }
        )
        this.getReviews(this.item.id);
        
      }
      
    })
  }

  createOrder(uid) {
    this.orderForm = this.fb.group({
      uid: uid,
      time: new FormControl(),
      room: new FormControl(),
      day: new FormControl(),
      hotel: this.item.name,
    });
  }

  getReviews(id){
    this.firebaseService.getReviews(id)
    .subscribe(result => {
      this.comment$ = result;
    })
  }

  createReview(displayName) {
    this.createReviewForm = this.fb.group({
      title: new FormControl(),
      content: new FormControl(),
      hid: this.item.id,
      created_at: new Date(),
      user: displayName
    });
  }

  onSubmit(value){
    this.firebaseService.createReview(value)
    .then (
      res => {
        window.location.reload();
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
