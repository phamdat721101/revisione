import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { UserService } from './user.service';
import { User } from '../model/user.model';

import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  jwtHelper: JwtHelper = new JwtHelper();
  currentUser: User = new User();

  constructor(private userService: UserService,
    private router: Router) {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   const decodedUser = this.decodeUserFromToken(token);
    //   this.setCurrentUser(decodedUser);
    // }
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(
      res => {
        console.log(res);
        // localStorage.setItem('token', res.token);
        // const decodedUser = this.decodeUserFromToken(res.token);
        // this.setCurrentUser(decodedUser);
        return this.loggedIn;
      }, error =>{
        console.log(error);
      }
            
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

//   setCurrentUser(decodedUser) {
//     this.loggedIn = true;
//     this.currentUser.id = decodedUser.id;
//     this.currentUser.email = decodedUser.email;
//     this.currentUser.name = decodedUser.name;
//     this.currentUser.auth_key = decodedUser.auth_key;
//     this.currentUser.participantId = decodedUser.participantId;
//     this.currentUser.participantName = decodedUser.participantName;
//     this.currentUser.role = decodedUser.role;
//     this.isAdmin = (decodedUser.role === constants.ROLE_ADMIN);
//   }

}
