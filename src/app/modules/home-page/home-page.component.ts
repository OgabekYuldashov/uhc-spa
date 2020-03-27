import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  plans: string [] = [ 'National Options PPO 20', 'National Options PPO 30', 'National Select Managed Care'];
  constructor() { }


  ngOnInit(): void {
  }

  getSelected() {

  }

  onChange(value: string) {

  }

  filterByPlan_And_Location_Distance() {

  }
}
