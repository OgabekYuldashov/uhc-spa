import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Parameters} from '../../models/parameters';
import {DataSearchService} from '../../services/data-search.service';
import {MatSliderModule} from '@angular/material/slider';

import {AfterViewInit, ViewChild, ElementRef} from '@angular/core';

// ==========================model=======

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewInit {
  canSpeackArabic: string;
  canSpeakSpanish: string;
  canSpeapkgermany: string;
  canSpeakItaly: string;
  canSpeakPortuese: string;
  canSpeakFarsi: string;
  // tslint:disable-next-line:variable-name
  Choose_Dental_Plan: string;

  togglebutton : number = 1;

  constructor(private route: Router, private dataSearchService: DataSearchService) {
    // tslint:disable-next-line:variable-name
    this.Choose_Dental_Plan = 'Choose Dental Plan';
    // this.parameter_list.plans = 'Choose Dental Plan';
  }


  // Slider attributes
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 50;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;

  isAdvancedSearchButtonCliked = false;

  // tslint:disable-next-line:variable-name
  parameter_list: Parameters = new Parameters();

  // ==================== Language Section======================
  oralSureon: string;

///////////////////////////////////////////
  endodontist: string;
  // tslint:disable-next-line:variable-name
  Extendedhourse_saturday: string;
  weekday: string;
  handicapAccecebility: any;


// =========Map Section===============

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  lat = 45.73061;
  lng = -73.935242;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
    this.marker.setMap(this.map);
  }


  // ========================

  onChange(e) {
    this.parameter_list.plans = e.target.value.toString();

  }


  filterByPlan_And_Location_Distance() {

    this.isAdvancedSearchButtonCliked = false;
    // tslint:disable-next-line:max-line-length
    this.parameter_list.languageSponeken = [this.canSpeackArabic, this.canSpeakFarsi, this.canSpeakItaly, this.canSpeakPortuese, this.canSpeakSpanish, this.canSpeapkgermany];
    this.parameter_list.specialization = [this.oralSureon, this.endodontist];
    console.log(this.parameter_list);
    this.isAdvancedSearchButtonCliked = false;

    // this.dataSearchService.getDummyRecords(this.parameter_list)
    this.dataSearchService.setParameters(this.parameter_list);
    this.route.navigate((['results']));

  }


  advancedSearch() {
    // tslint:disable-next-line:triple-equals
    if(this.togglebutton % 2 == 0) {
      this.isAdvancedSearchButtonCliked =  false;
      this.togglebutton = this.togglebutton + 1;
    } else {
      this.isAdvancedSearchButtonCliked = true;
      this.togglebutton = this.togglebutton + 1;
    }
    // this.isAdvancedSearchButtonCliked = true;
    // this.parameter_list.plans=
    //   this.parameter_list.location= this.
    if ((this.oralSureon === 'Y') && (this.endodontist === 'Y')) { // @ts-ignore
      this.parameter_list.specialization = [this.oralSureon, this.endodontist];
    }
    if ((this.oralSureon === 'Y') && (this.endodontist === 'N')) { // @ts-ignore
      this.parameter_list.specialization = [this.oralSureon];
    }

    if ((this.oralSureon === 'N') && (this.endodontist === 'Y')) { // @ts-ignore
      this.parameter_list.specialization = [this.endodontist];
    }

    this.canSpeackArabic = 'Arabic';
    this.canSpeakSpanish = 'Spanish'
    this.canSpeapkgermany = 'Germany'
    this.canSpeakItaly = 'Italy'
    this.canSpeakPortuese = 'Portugese'
    this.canSpeakFarsi = 'Farsi';
  }

  ngOnInit(): void {

    this.Choose_Dental_Plan = 'Choose Dental Plan';
  }

  getSliderTickInterval(): number {
    if (this.showTicks) {
      const value = this.autoTicks ? 'auto' : this.tickInterval + 'mi';
      this.parameter_list.distanceFromYourAddress = this.value + 'mi';
      return this.value;
    }

    return 0;
  }

  valueChange(e: string) {
    this.parameter_list.location = e.trim().toString();
    console.log('your location is ==========' + this.parameter_list.location);

  }

  isacceptingNew(isChecked) {

    if (isChecked) {
      this.parameter_list.acceptingNew = isChecked;
    }


  }

  isOralSurgeon(checked: boolean) {
    if (!checked) {
      this.oralSureon = '';
    } else {
      this.oralSureon = 'Y';
    }

  }

  isEndodontist(checked: boolean) {
    if (!checked) {
      this.endodontist = '';
    } else {
      this.endodontist = 'Y';
    }

  }

  isThereExtendedhourse_saturday(checked: boolean) {
    if (!checked) {
      this.Extendedhourse_saturday = 'N';
    } else {
      this.Extendedhourse_saturday = 'Y';
    }

  }

  isWeekdayWorking(checked: boolean) {
    if (!checked) {
      this.weekday = 'N';
    } else {
      this.weekday = 'Y';
    }

  }

  ishandicapAccecebility(checked: boolean) {

    if (!checked) {
      this.handicapAccecebility = 'N';
    } else {
      this.handicapAccecebility = 'Y';
    }

  }

  isMale(e) {
    this.parameter_list.gender = 'M';
  }

  isFemale($event: MouseEvent) {
    this.parameter_list.gender = 'F';
  }

  onPlanChange(e) {
    this.parameter_list.plans = e;
    console.log(' selected plan is ' + e);

  }
}
