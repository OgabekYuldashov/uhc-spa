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

  // =========================================================

  searchParams = new Parameters();

  changeGender(gender: string) {
    console.log('Before changeGender: ' + this.searchParams.gender);

    if (this.searchParams.gender === gender) {
      this.searchParams.gender = undefined;
    } else {
      this.searchParams.gender = gender;
    }
    console.log('After changeGender: ' + this.searchParams.gender);
  }

  onLangCheckboxChanged(language: string) {
    console.log('Before onLangCheckboxChanged: ' + this.searchParams.languageMap.get(language));
    this.searchParams.languageMap.set(language, !this.searchParams.languageMap.get(language));
    console.log('After onLangCheckboxChanged: ' + this.searchParams.languageMap.get(language));
  }

  onSpecializationCheckboxChanged(specialization: string) {
    console.log('Before onSpecializationCheckboxChanged: ' + this.searchParams.specializationMap.get(specialization));

    this.searchParams.specializationMap.set(specialization, !this.searchParams.specializationMap.get(specialization));

    console.log('After onSpecializationCheckboxChanged: ' + this.searchParams.specializationMap.get(specialization));
  }




  // =========================================================


  // tslint:disable-next-line:variable-name
  Choose_Dental_Plan: string;

  togglebutton: number = 1;

  // tslint:disable-next-line:no-construct ban-types
  langs: String[]= new Array();
  gender: boolean = false;

  constructor(private route: Router, private dataSearchService: DataSearchService) {
    // tslint:disable-next-line:variable-name
    // this.Choose_Dental_Plan = 'Choose Dental Plan';
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
  distanceValue = 0;
  vertical = false;
  tickInterval = 1;

  isAdvancedSearchButtonCliked = false;

  // tslint:disable-next-line:variable-name

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



  filterByPlan_And_Location_Distance() {

    this.isAdvancedSearchButtonCliked = false;
    // tslint:disable-next-line:max-line-length
    // this.searchParams.languageSponeken = [this.canSpeackArabic, this.canSpeakFarsi, this.canSpeakItaly, this.canSpeakPortuese, this.canSpeakSpanish, this.canSpeapkgermany];
    // this.searchParams.specialization = [this.oralSureon, this.endodontist];
    // console.log(this.searchParams);
    // this.isAdvancedSearchButtonCliked = false;

    // console.log('list of all selected lang' + this.langs);

    // this.dataSearchService.getDummyRecords(this.parameter_list)
    this.dataSearchService.setParameters(this.searchParams);
    this.route.navigate((['results']));

  }


  advancedSearch() {
    // tslint:disable-next-line:triple-equals
    if (this.togglebutton % 2 == 0) {
      this.isAdvancedSearchButtonCliked = false;
      this.togglebutton = this.togglebutton + 1;
    } else {
      this.isAdvancedSearchButtonCliked = true;
      this.togglebutton = this.togglebutton + 1;
    }
    // this.isAdvancedSearchButtonCliked = true;
    // this.parameter_list.plans=
    //   this.parameter_list.location= this.
    if ((this.oralSureon === 'Y') && (this.endodontist === 'Y')) { // @ts-ignore
      this.searchParams.specialization = [this.oralSureon, this.endodontist];
    }
    if ((this.oralSureon === 'Y') && (this.endodontist === 'N')) { // @ts-ignore
      this.searchParams.specialization = [this.oralSureon];
    }

    if ((this.oralSureon === 'N') && (this.endodontist === 'Y')) { // @ts-ignore
      this.searchParams.specialization = [this.endodontist];
    }

  }

  ngOnInit(): void {

    this.Choose_Dental_Plan = 'Choose Dental Plan';
  }

  getSliderTickInterval(): number {
    // this.range = this.tickInterval;
    this.searchParams.distanceFromYourAddress = this.distanceValue.toString();
    // console.log('new distance is ' + this.distanceValue);

    // alert('================ new distance' + value);
    return this.distanceValue;


    /*if (this.showTicks) {
      const value = this.autoTicks ? 'auto' : this.tickInterval + 'mi';
      this.searchParams.distanceFromYourAddress = this.value + 'mi';
      return this.value;
    }

    return 0;*/
  }

  valueChange(e: string) {
    this.searchParams.location = e.trim().toString();
    console.log('your location is ==========' + this.searchParams.location);

  }

  isacceptingNew(isChecked) {
    console.log('Before isacceptingNew: ' + this.searchParams.acceptingNew);
    this.searchParams.acceptingNew = isChecked;
    console.log('After isacceptingNew: ' + this.searchParams.acceptingNew);
  }


  isThereExtendedhourse_saturday(checked: boolean) {
    this.searchParams.extendedHrsSat = checked;
  }

  isWeekdayWorking(checked: boolean) {
    this.searchParams.extendedHrsWeek = checked;
  }

  ishandicapAccecebility(checked: boolean) {
    this.searchParams.handicapAccessible = checked;
  }


  onPlanChange(e) {
    this.searchParams.plans = e;
    console.log('selected plan is ' + e);
    this.Choose_Dental_Plan = e;
  }

}
