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
      cost: this.item.price,
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
    let header = (<HTMLInputElement>document.getElementById("Header")).value;
    header = header.replace(/(^\s*)|(\s*$)/gi,"");
    header = header.replace(/[ ]{2,}/gi," ");
    header = header.replace(/\n /,"\n");

    let msg = (<HTMLInputElement>document.getElementById("Message")).value;
    msg = msg.replace(/(^\s*)|(\s*$)/gi,"");
    msg = msg.replace(/[ ]{2,}/gi," ");
    msg = msg.replace(/\n /,"\n");

    if (msg.split(' ').length <= 5 || header === null) {
      alert("Please check that you have entered title and your review has more than 5 words!");
    } else {
      this.firebaseService.createReview(value)
      .then (
        res => {
          window.location.reload();
        }
      );
    }
  }

  onOrder(value){
    var keys = Object.keys(value)
    var values = Object.values(value)
    var valid = true

    var time = new Date(value.time);
    var now = new Date();
    if(time < now){
      valid = false
      alert("You cannot book a date in the past")
    }
    if(!(Number.isInteger(value.room) && value.room > 0)){
      valid = false
      alert("You must input a valid number of rooms")
    }
    if(!(Number.isInteger(value.day) && value.day > 0)){
      valid = false
      alert("You must input a valid number of days")
    }
    if(valid){
      this.firebaseService.createOrder(value)
      .then (
        res => {

          alert("Your bill is "+value.day*value.cost*value.room+"$. You can check your order at your profile page.")
          window.location.reload();
        }
      )

    }

  }
}
