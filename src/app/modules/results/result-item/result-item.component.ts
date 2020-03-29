import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ResultItem} from '../../../models/ResultItem';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {

  @Input() resItem: ResultItem;

  specialty = 'General Dentist';
  address = '330 W TIENKEN RD ROCHESTER HILLS, MI 48306';
  phone = '2486521487';
  email = 'nicoleleigh@gmail.com';
  website = 'nicoleleigh.com';
  websiteUrl = 'nicoleleigh.com';
  gender = 'Female';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    let url = '';
    if (!/^http[s]?:\/\//.test(this.website)) {
      url += 'http://';
    }

    url += this.website;
    this.websiteUrl = url;
  }

  onResultItemClick() {
    this.router.navigate(['/details', this.resItem.npi]);
  }
}
