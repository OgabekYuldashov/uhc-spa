import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {

  specialty = 'General Dentist';
  address = '330 W TIENKEN RD ROCHESTER HILLS, MI 48306';
  phone = '2486521487';
  email = 'nicoleleigh@gmail.com';
  website = 'nicoleleigh.com';
  websiteUrl = 'nicoleleigh.com';
  gender = 'Female';
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
