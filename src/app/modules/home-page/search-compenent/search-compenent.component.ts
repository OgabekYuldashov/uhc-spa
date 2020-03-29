import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';

import {AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Parameters} from '../../../models/parameters';

@Component({
  selector: 'app-search-compenent',
  templateUrl: './search-compenent.component.html',
  styleUrls: ['./search-compenent.component.css']
})
export class SearchCompenentComponent implements OnInit {

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
  // tslint:disable-next-line:variable-name
  Choose_Dental_Plan: string;
  // tslint:disable-next-line:variable-name
  parameter_list: Parameters = new Parameters();
  constructor() { }

  ngOnInit(): void {
  }
  getSliderTickInterval(): number {
    if (this.showTicks) {
      const value = this.autoTicks ? 'auto' : this.tickInterval + 'mi';
      this.parameter_list.distanceFromYourAddress = this.value + 'mi';
      return this.value;
    }

    return 0;
  }
  onPlanChange(e) {
    this.parameter_list.plans = e;
    console.log('selected plan is ' + e);
    this.Choose_Dental_Plan = e;


  }

  filterByPlan_And_Location_Distance() {

  }
}
