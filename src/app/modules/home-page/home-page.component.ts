import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {DatafectcingService} from '../../services/datafectcing.service';
import {MatSliderModule} from '@angular/material/slider';
import {Parameters} from '../../models/parameters';

// ==========================model=======

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  canSpeackArabic = 'Arabic';
  canSpeakSpanish = 'Spanish'
  canSpeapkgermany = 'Germany'
  canSpeakItaly = 'Italy'
  canSpeakPortuese = 'Portugese'
  canSpeakFarsi = 'Farsi'


  constructor(private fb: FormBuilder, private datafectcingService: DatafectcingService, private route: ActivatedRoute) {

    // this.plans = ['National Options PPO 20', 'National Options PPO 30', 'National Select Managed Care'];
    // this.specializations = [
    //   {name: 'Oral-Surgeon', value: 'Oral-Surgeon'},
    //   {name: 'Endodontist', value: 'Endodontist'},
    //   {name: 'Lorem-Ipsum', value: 'Lorem-Ipsum'},
    //   {name: 'Lorem-Ipsum', value: 'Lorem-Ipsum'},
    // ];
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

  specializations: Array<any>;
  // form: FormGroup;FormGroup
  // ordersData = [];


  // ========variable for Jsonobject==============


  jsonDataModel: any[];
  selectedPlan: string;
  location: string;

  // tslint:disable-next-line:variable-name
  parameter_list: Parameters = new Parameters();

  // ==================== Language Section======================


  // indexsubmit() {
  //   console.log(this.form.value.name);
  // }
  oralSureon: string;

///////////////////////////////////////////
  endodontist: string;
  // tslint:disable-next-line:variable-name
  Extendedhourse_saturday: string;
  weekday: string;
  handicapAccecebility: any;


  // tslint:disable-next-line:variable-name
  Choose_Dental_Plan = 'Choose Dental Plan';

  getSelected() {

  }

  onChange(e) {
    this.parameter_list.plans = e.target.value.toString();

  }


  filterByPlan_And_Location_Distance() {

    this.isAdvancedSearchButtonCliked = false;
    this.parameter_list.languageSponeken = [this.canSpeackArabic, this.canSpeakFarsi, this.canSpeakItaly, this.canSpeakPortuese, this.canSpeakSpanish, this.canSpeapkgermany];
    this.parameter_list.specialization = [this.oralSureon, this.endodontist];
    console.log(this.parameter_list);
    this.isAdvancedSearchButtonCliked= false;

  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'mi';
    }

    return value;
  }


  advancedSearch() {
    this.isAdvancedSearchButtonCliked = true;
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

  }

  ngOnInit(): void {
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
