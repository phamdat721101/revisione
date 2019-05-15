import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public firebaseService: FirebaseService
    ) { }

  ngOnInit() {
    this.createHotelForm()
  }

  createHotelForm() {
    this.userForm = this.fb.group({
      name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      place: new FormControl(),
      address: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
    });
  }

  onSubmit(value) {
    var validator = true;
    if(validator){
        this.firebaseService.createHotel(value)
        .then (
            res => {
              window.location.reload();
            }
          )
      } 
    }
}
