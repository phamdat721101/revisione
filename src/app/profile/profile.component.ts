import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public firebaseService: FirebaseService
    ) { }

  ngOnInit() {
    this.auth.user$.subscribe(
      (user) =>  this.updateUser()
    )
  }

  updateUser() {
    this.userForm = this.fb.group({
      displayName: new FormControl(),
      firstname: new FormControl(),
      lastname: new FormControl(),
      country: new FormControl(),
      birth: new FormControl()
    });
  }

  onSubmit(value) {
    var validator = true;
    if(validator){
      this.auth.user$.subscribe(
        (user) => this.firebaseService.updateUser(user.uid, value)
        .then (
          res => {
            window.location.reload();
          }
        )
        )
      } 
    }
}
