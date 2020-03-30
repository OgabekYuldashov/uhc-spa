import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {DataSearchService} from '../../../services/data-search.service';
import {ResultItem} from '../../../models/ResultItem';
import {Parameters} from '../../../models/parameters';

@Component({
  selector: 'app-results-main',
  templateUrl: './results-main.component.html',
  styleUrls: ['./results-main.component.css']
})
export class ResultsMainComponent implements OnInit, AfterViewInit {
  @ViewChild('resultsMap', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  lat = 37.730610;
  lng = -73.935242;

  resItems: ResultItem[];
  searchParams: Parameters;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  markers = [
    {
      position: new google.maps.LatLng(38.75948077253505, -75.1281763573177),
      map: this.map,
      title: 'Marker 1'
    },
    {
      position: new google.maps.LatLng(38.762026, -75.14523),
      map: this.map,
      title: 'Marker 2'
    },
    {
      position: new google.maps.LatLng(38.722522, -75.1197165),
      map: this.map,
      title: 'Marker 3'
    }
  ];




  //
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

  getSliderTickInterval(): number {
    if (this.showTicks) {
      const value = this.autoTicks ? 'auto' : this.tickInterval + 'mi';
      this.searchParams.distanceFromYourAddress = this.value + 'mi';
      return this.value;
    }

    return 0;
  }
  onPlanChange(e) {
    this.searchParams.plans = e;
    console.log('selected plan is ' + this.searchParams.plans);


  }

  filterByPlan_And_Location_Distance() {
    this.dataService.getResultItems().subscribe(r => {
      this.resItems = this.dataService.getResults(r);
      console.log('res:');
      console.log(this.resItems);
    });

    this.searchParams = this.dataService.getParameters();
    console.log('Search Params:');
    console.log(this.searchParams);
  }
  //





  constructor(private dataService: DataSearchService) {
    this.searchParams = dataService.getParameters();
    console.log('Search Params:');
    console.log(this.searchParams);

    dataService.getResultItems().subscribe(r => {
      this.resItems = this.dataService.getResults(r);
      console.log('res:');
      console.log(this.resItems);
    });

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    // Adding Click event to default marker
    this.marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    // Adding default marker to map
    this.marker.setMap(this.map);

    // Adding other markers
    this.loadAllMarkers();
  }

  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      // Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      // creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      // Add click event to open info window on marker
      marker.addListener('click', () => {
        infoWindow.open(marker.getMap(), marker);
      });

      // Adding marker to google map
      marker.setMap(this.map);
    });
  }

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
}
