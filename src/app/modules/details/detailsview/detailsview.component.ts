import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailsview',
  templateUrl: './detailsview.component.html',
  styleUrls: ['./detailsview.component.css']
})
export class DetailsviewComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  specialty = 'General Dentist';
  address = '330 W TIENKEN RD ROCHESTER HILLS, MI 48306';
  phone = '2486521487';
  email = 'nicoleleigh@gmail.com';
  website = 'nicoleleigh.com';
  websiteUrl = 'nicoleleigh.com';
  gender = 'Female';
  plans: string[] =['Nationals Options PPO 20', 'National Options PPO 30', 'CA Select Managed Care DHMO Plan',
          'CA Select Managed Care Direct Compensation'];
  languages = ["English", " Korean", " Italian "];
  npi = "178761346";
  licence ="DDS - MI-2901016937";
  education = "MBBS";

  map: google.maps.Map;
  lat = 40.730610;
  lng = -73.935242;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let url = '';
    if (!/^http[s]?:\/\//.test(this.website)) {
      url += 'http://';
    }

    url += this.website;
    this.websiteUrl = url;
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
    this.mapOptions);
    this.marker.setMap(this.map);
   }
   ngAfterViewInit() {
    this.mapInitializer();
   }
   marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

}
