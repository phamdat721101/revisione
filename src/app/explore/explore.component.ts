import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { } from '@types/googlemaps';
@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  constructor(private router: Router) { }

  ngOnInit() {
    var mapProp = {
      zoom: 17,
      center: new google.maps.LatLng(18.5793, 73.8143),
      scrollwheel: false,
      scaleControl: false,
      disableDefaultUI: true,
      mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'gMap']
      }
    };
    this.map = new google.maps.Map(document.getElementById("exploreGoogleMap"), mapProp);
    var geocoder_map = new google.maps.Geocoder();
    var address = 'rome';
    geocoder_map.geocode({
        'address': address
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            this.map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: this.map,
                position: this.map.getCenter()
            });
        }
    });
    var mapType = new google.maps.StyledMapType( [{
      featureType: "all",
      elementType: "all",
      stylers: [{
          saturation: -50
              }]
          }], {
        name: "Grayscale"
    });
    this.map.mapTypes.set('gMap', mapType);
    this.map.setMapTypeId('gMap');
  }
  searchPlace(value: any){
    this.router.navigate(["/Search"]);
  }
  searchEvent(value: any){
    this.router.navigate(["/Search"]);
  }

}
