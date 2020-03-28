import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailsview',
  templateUrl: './detailsview.component.html',
  styleUrls: ['./detailsview.component.css']
})
export class DetailsviewComponent implements OnInit {

  specialty = 'General Dentist';
  address = '330 W TIENKEN RD ROCHESTER HILLS, MI 48306';
  phone = '2486521487';
  email = 'nicoleleigh@gmail.com';
  website = 'nicoleleigh.com';
  websiteUrl = 'nicoleleigh.com';
  gender = 'Female';
  plans =['Nationals Options PPO 20', 'National Options PPO 30', 'CA Select Managed Care DHMO Plan',
          'CA Select Managed Care Direct Compensation'];
  languages = ["English", "Korean", "Italian"];
  npi = "178761346";
  licence ="DDS - MI-2901016937";
  education = "MBBS";

  constructor() { }

  ngOnInit(): void {
    let url = '';
    if (!/^http[s]?:\/\//.test(this.website)) {
      url += 'http://';
    }

    url += this.website;
    this.websiteUrl = url;
  }

}
