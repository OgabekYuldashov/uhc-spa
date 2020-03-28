import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

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
  tickInterval = 1
  specializationform: FormGroup;

  isAdvancedSearchButtonCliked = false;

  specializations: Array<any>;
  form: FormGroup;
  ordersData = [];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      orders: new FormArray([], minSelectedCheckboxes(1))
    });

    // async orders
    of(this.getOrders()).subscribe(orders => {
      this.ordersData = orders;
      this.addCheckboxes();
    });
    this.plans = ['National Options PPO 20', 'National Options PPO 30', 'National Select Managed Care'];
    this.specializations = [
      {name: 'Oral-Surgeon', value: 'Oral-Surgeon'},
      {name: 'Endodontist', value: 'Endodontist'},
      {name: 'Lorem-Ipsum', value: 'Lorem-Ipsum'},
      {name: 'Lorem-Ipsum', value: 'Lorem-Ipsum'},
    ];
  }

  plans: string [];

  // ======================= Language =================//////

  lastAction: string;

  data = [
    {label: 'one', checked: false},
    {label: 'two', checked: false},
    {label: 'three', checked: true},
    {label: 'four', checked: false},
    {label: 'five', checked: false}
  ];


  ngOnInit(): void {
  }

  getSelected() {

  }

  onChange(value: string) {

  }

  filterByPlan_And_Location_Distance() {


    this.isAdvancedSearchButtonCliked = false;

  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'mi';
    }

    return value;
  }


  advancedSearch() {

    this.isAdvancedSearchButtonCliked = true;


  }

  // tslint:disable-next-line:adjacent-overload-signatures
  onLanguageChange(event, index, item) {

    item.checked = !item.checked;

    this.lastAction = 'index: ' + index + ', label: ' + item.label + ', checked: ' + item.checked;

    console.log(index, event, item);

  }

  /// method for slider action/
  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      this.value = this.autoTicks ? 0 : this.tickInterval;
      return this.value;
    }
    return 0;
  }

  //////////             Handling mupltiple checkbox              //////////////////////////////////////
  onCheckboxChange(e) {
    const checkArray: FormArray = this.specializationform.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


///////////////////////////////////////////

  submitForm() {
    console.log(this.specializationform.value);
  }

  // ==================== Language Section======================
  private addCheckboxes() {
    this.ordersData.forEach((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.orders as FormArray).push(control);
    });
  }
  getOrders() {
    return [
      { id: 100, name: 'order 1' },
      { id: 200, name: 'order 2' },
      { id: 300, name: 'order 3' },
      { id: 400, name: 'order 4' }
    ];
  }

  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => v ? this.ordersData[i].id : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
