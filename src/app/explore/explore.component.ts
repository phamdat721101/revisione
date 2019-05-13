import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.min.js';
import * as Mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { environment } from '../../environments/environment';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  @ViewChild('mapCanvas')
  private mapCanvasElementRef: ElementRef;

  private get mapCanvasNativeElement(): HTMLElement {
    return this.mapCanvasElementRef.nativeElement;
  }
  private map: Mapboxgl.Map;
  private style: string;
  private longitude: number;
  private latitude: number;
  private zoom: number;
  private geocoder: MapboxGeocoder;
  private geolocate: Mapboxgl.GeolocateControl;
  places: any;
  placesFilter: any;
  destination: any;
  price: any;
  constructor(private router: Router,
    private placeService: FirebaseService) { 
    Mapboxgl.accessToken = environment.mapbox_public_token;
    this.style = 'mapbox://styles/sagewall/ciwf7ja64001o2psg2v73nsya';
    this.longitude = 107.0967741;
    this.latitude = 10.351835;
    this.zoom = 10;
  }

  ngOnInit() {
    this.map = new Mapboxgl.Map({
      container: this.mapCanvasNativeElement,
      style: this.style,
      center: [this.longitude, this.latitude],
      zoom: this.zoom
    });

    this.geocoder = new MapboxGeocoder({
      accessToken: Mapboxgl.accessToken,
      mapboxgl: Mapboxgl
    });
    this.map.addControl(this.geocoder, 'top-left');
    this.geolocate = new Mapboxgl.GeolocateControl({});
    this.map.addControl(this.geolocate, 'top-right');
    this.getPlaces();
    this.getPlacesFilter();
  }
  getPlaces(){
    this.placeService.getHotels().subscribe(ref => this.places = ref);
  } 
  getPlacesFilter(){
    this.placeService.getHotels().subscribe(ref => this.placesFilter = ref);
  }
  searchPlace(){
    this.placeService.searchPlaceFilter(this.destination,this.price).subscribe(result => {      
      this.placesFilter = result;
    });
  }
}
