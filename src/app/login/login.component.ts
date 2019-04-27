import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;  
  email = new FormControl('',Validators.required);
  password = new FormControl('',Validators.required);
  constructor(private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private user: UserService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email : this.email,
      password : this.password
    });
  }
  login(){
    this.auth.login(this.loginForm.value).subscribe(result =>{
        console.log(result);
        this.router.navigate(['/Dashboard']);
    }, error =>{
      console.log(error);
    });
  }

}
