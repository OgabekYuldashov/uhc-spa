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

  constructor(private route: Router, private dataSearchService: DataSearchService) {
    // tslint:disable-next-line:variable-name
    // this.Choose_Dental_Plan = 'Choose Dental Plan';
    // this.parameter_list.plans = 'Choose Dental Plan';
  }
  canSpeackArabic: string;
  canSpeakSpanish: string;
  canSpeapkgermany: string;
  canSpeakItaly: string;
  canSpeakPortuese: string;
  canSpeakFarsi: string;
  // tslint:disable-next-line:variable-name
  Choose_Dental_Plan: string;

  togglebutton: number = 1;

  Arabic = 'Arabic';
  Spanish = 'Spanish';
  German = 'German';
  Romanian = 'Romanian';
  French = 'French';
  Hindi = 'Hindi';
  Italian = 'Italian';
  Russian = 'Russian';
  Korean = 'Korean';
  Portugese = 'Portugese';
  Chinese = 'Chinese'
  Egyptian = 'Egyptian';
  Farsi = 'Farsi';
  Polish = 'Polish';
  Greek = 'Greek';
  // tslint:disable-next-line:no-construct ban-types
  langs: String[]= new Array();

  private range: number;


  // Slider attributes
  autoTicks = false;
  max = 50;
  min = 0;
  step = 1;
  thumbLabel = true;
  value34 = 0;
  tickInterval = 1;

  isAdvancedSearchButtonCliked = false;

  // tslint:disable-next-line:variable-name
  parameter_list: Parameters = new Parameters();
  searchParams: Parameters;
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

  // ========================
  maxillofacialSurgeon: string;
  Pediatric: string;

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
    this.marker.setMap(this.map);
  }

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

    console.log('list of all selected lang' + this.langs);

    // this.dataSearchService.getDummyRecords(this.parameter_list)
    this.dataSearchService.setParameters(this.parameter_list);
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
      this.range =  this.tickInterval ;
      this.parameter_list.distanceFromYourAddress = this.value34 ;
    console.log('new distance is ' + this.value34);

      // alert('================ new distance' + value);
      return this.value34;

  }

  valueChange(e: string) {
    this.parameter_list.location = e.trim().toString();

    console.log('your location is ==========' + this.parameter_list.location );
    alert('new distance ==========' + this.parameter_list.location );

  }

  isacceptingNew(isChecked) {

    if (isChecked) {
      this.parameter_list.acceptingNew = isChecked;
    }


  }

  isOralSurgeon(checked: boolean) {
    const  specialization = 'oralSurgeon' ;
    if (!checked) {
      this.oralSureon = '';
    } else {
      this.oralSureon = 'Y';
    }

  }

  isEndodontist(checked: boolean) {
    const  specialization = 'Endodontist' ;
    if (!checked) {
     this.parameter_list.specializationMap[specialization] = !this.parameter_list.specializationMap[specialization];
    }

    //
    // onSpecializationCheckboxChanged(specialization: string) {
    //   console.log('onSpecializationCheckboxChanged: ' + specialization);
    //   this.searchParams.specializationMap[specialization] = !this.searchParams.specializationMap[specialization];
    // }
    //
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
    console.log('selected plan is ' + e);
    this.Choose_Dental_Plan = e;


  }

  isArabic(c: boolean) {
    if (c) {
      this.Arabic = 'Arabic';
      this.langs.push(this.Arabic);
    }
  }

  isSpanis(c: boolean) {

    if (c) {
      this.Spanish = 'Spanish';
      this.langs.push(this.Spanish);
    }
  }


  isGermany(c: boolean) {
    if (c) {

      this.German = 'German'
      this.langs.push(this.German);
    }

  }

  isRomanian(ch: boolean) {
    if (ch) {
    this.langs.push(this.Romanian);
    }
  }
  isFrench(checked: boolean) {
    if (checked) {
      this.langs.push(this.French)
      console.log(' this langs array=====' + this.langs);
    }

  }

  isMaxillofacial(ch: boolean) {
    if(ch) {
      const  specialization = 'maxillofacialSurgeon' ;
      this.parameter_list.specializationMap[specialization] = !this.parameter_list.specializationMap[specialization];
      }
    }

  isPediatric(ch: boolean) {
    if(ch) {
      const  specialization = 'Pediatric' ;
      this.parameter_list.specializationMap[specialization] = !this.parameter_list.specializationMap[specialization];
    }

  }

  isHindi(ch: boolean) {
    if (ch) {
      const  lengSpoken = 'Hindi' ;
      this.parameter_list.languageMap[lengSpoken] = !this.parameter_list.languageMap[lengSpoken];
    }
  }

  isItalian(ch: boolean) {
    if (ch) {
      const  lengSpoken = 'Italian' ;
      this.parameter_list.languageMap[lengSpoken] = !this.parameter_list.languageMap[lengSpoken];
    }
  }

  isRussian(ch: boolean) {
    if (ch) {
      const  lengSpoken = this.Russian ;
      this.parameter_list.languageMap[lengSpoken] = !this.parameter_list.languageMap[lengSpoken];
    }
  }

  isKorean(ch: boolean) {
    const  lengSpoken = this.Korean;
    this.parameter_list.languageMap[lengSpoken] =!this.parameter_list.languageMap[lengSpoken];

  }

  isPortugese(ch: boolean) {
    if(ch){
      const  lengSpoken = this.Polish;
      this.parameter_list.languageMap[lengSpoken] = !this.parameter_list.languageMap[lengSpoken];
    }

  }

  isChinse(ch: boolean) {
    if(ch){
      const  lengSpoken = this.Chinese;
      this.parameter_list.languageMap[lengSpoken] = !this.parameter_list.languageMap[lengSpoken];
    }

  }

  isEgyptsin(ch: boolean) {

    if(ch){
      const  lengSpoken = this.Egyptian;
      this.parameter_list.languageMap[lengSpoken] = !this.parameter_list.languageMap[lengSpoken];
    }
  }

  isFarsi(ch: boolean) {
    if(ch){
      const  lengSpoken = this.Farsi;
      this.parameter_list.languageMap[lengSpoken] = !this.parameter_list.languageMap[lengSpoken];
    }
  }

  isPolish(ch: boolean) {
    if(ch){
      const  lengSpoken = this.Polish;
      this.parameter_list.languageMap[lengSpoken] = !this.parameter_list.languageMap[lengSpoken];
    }
  }

  isGreek(ch: boolean) {
    const  lengSpoken = this.Greek;
    this.parameter_list.languageMap[lengSpoken] = !this.parameter_list.languageMap[lengSpoken];
  }
}
