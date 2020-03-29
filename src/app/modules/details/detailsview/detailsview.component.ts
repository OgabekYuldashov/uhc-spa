import { DataSearchService } from './../../../services/data-search.service';
import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultItem } from 'src/app/models/ResultItem';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detailsview',
  templateUrl: './detailsview.component.html',
  styleUrls: ['./detailsview.component.css']
})
export class DetailsviewComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  fullName: string;
  specialty: string;
  address: string;
  phone: string;
  email = 'nicoleleigh@gmail.com';
  website = 'nicoleleigh.com';
  websiteUrl = 'nicoleleigh.com';
  gender: string;
  plans: string[];
  languages: string[];
  npi: string;
  licence: string;
  education = "MBBS";
  acceptingNew: boolean;
  handicapAccessible: boolean;
  officeTimings: string[];
  id: string;
  resultItem: ResultItem;

  map: google.maps.Map;
  lat: number = 61.216112;
  lng: number = -149.733643;

  constructor(private route: ActivatedRoute, private service: DataSearchService) {

    this.route.params.subscribe(params => {this.id = params['npi']; });

    console.log(this.id)

    // this.resultItem = this.service.getResults();
    // console.log(this.resultItem.subscribe);
    this.resultItem = this.service.getRecordByNPI('1568877207');
    console.log(this.resultItem);
    this.specialty = this.resultItem.specialization;
    this.fullName = this.resultItem.fullName;
    this.address = this.resultItem.fullAddress;
    this.phone = this.resultItem.phone;

    if(this.resultItem.gender=='F') {
      this.gender ='Female';
    }
    else this.gender = 'Male';

    this.plans = this.resultItem.plans;
    this.languages = this.resultItem.languages;
    this.npi = this.resultItem.npi;
    this.licence = this.resultItem.licenseNumber;
    this.officeTimings = this.resultItem.officeTimings;
    if(this.resultItem.acceptingNew=="Y") this.acceptingNew=true;
    else this.acceptingNew=false;
    if(this.resultItem.handicapAccessible=="Y") this.handicapAccessible=true;
    else this.handicapAccessible=false;

    let coord: string[] = this.resultItem.location.split(",");
    console.log(parseFloat(coord[0]));
    this.lat = parseFloat(coord[0]);
    this.lng = parseFloat(coord[1]);
   // console.log(this.resultItem);



   //console.log(this.service.getRecordByNPI(this.npi));
  }

  ngOnInit(): void {
    let url = '';
    if (!/^http[s]?:\/\//.test(this.website)) {
      url += 'http://';
    }

    url += this.website;
    this.websiteUrl = url;
  }

  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };
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
