import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { KeyRegistry } from '@angular/core/src/di/reflective_key';

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

  onSubmit(values) {

    this.auth.user$.subscribe(
      (user) => {
        var keys = Object.keys(values)
        var value = Object.values(values)
        var userkeys = Object.keys(user)
        var uservalue = Object.values(user)
        var lenuser = userkeys.length
        var len = keys.length;
        for(var i = 0; i < len; i++){
          if(value[i] == null)
          {
            for (var t =0; t < lenuser; t ++){
              if(userkeys[t] == keys[i]) {
                value[i] = uservalue[t];
              }
            }
          }
        }
        console.log('//////')
        var sendData = {
          "displayName": value[0],
          "firstname": value[1],
          "lastname": value[2],
          "country": value[3],
          "birth": value[4],
        }
        this.firebaseService.updateUser(user.uid, sendData)
        .then (
          res => {
            window.location.reload();
          }
        )

      }
    )
    }
}
