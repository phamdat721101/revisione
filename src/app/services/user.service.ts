import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user.model';
import { of } from 'rxjs/observable/of';
// import { UtilService } from './util.service';
import { AppHttpClient } from './app-http.service';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  apiUrl: String = environment.apiUrl;

  constructor(
    private appHttpClient: AppHttpClient,
    private httpClient: HttpClient
  ) { }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl + 'users/signup', user);
  }

  login(credentials): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');    
    return this.httpClient.post<User>('http://localhost:5000' +'/users/login', credentials);
  }

  getUsers(participant_id: string): Observable<any> {
    return this.appHttpClient.get('users?participantId=' + participant_id);
  }

  disableUser(user_id: String): Observable<any> {
    return this.appHttpClient.put('users/disable/' + user_id, null);
  }

  disableUsers(userID: String[]): Observable<any> {
    return this.appHttpClient.post('users/disableByIds', userID);
  }

  editProfile(user): Observable<any> {
    return this.appHttpClient.put("users/profile", user);
  }

  editPassword(change): Observable<any> {
    return this.appHttpClient.put("users/password", change);
  }

  enableUser(user_id: String): Observable<any> {
    return this.appHttpClient.put('users/enable/' + user_id, null);
  }

  enableUsers(userID: String[]): Observable<any> {
    return this.appHttpClient.post('users/enableByIds', userID);
  }

  signupUser(newUser: { name: string, email: string, password: string }): Observable<any> {
    return this.appHttpClient.post('users/signup', newUser);
  }
}
