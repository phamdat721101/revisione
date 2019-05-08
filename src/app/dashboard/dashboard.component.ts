import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  Filter: FormGroup;
  destination: any;
  places: any;  
  price: any;
  id_des: any;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private placeservice: FirebaseService) { }   
  ngOnInit() {
    this.Filter = this.formBuilder.group({

    });
    this.getPlaces();
  }
  getPlaces(){
    this.placeservice.getHotels().subscribe(ref => this.places = ref)
  }
  searchPlace(){
    //console.log(this.destination);
    this.placeservice.searchPlaceFilter(this.destination,this.price).subscribe(result => {      
      this.router.navigate(['/hotel/'+ result[0].payload.doc.id]);
    });
    //console.log(this.id_des);
    //this.router.navigate(["/search"]);
  }

}
