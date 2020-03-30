import { Injectable } from '@angular/core';
import {ResultItem} from '../models/ResultItem';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestParams} from 'elasticsearch';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {Observable} from 'rxjs';
import {Parameters} from '../models/parameters';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
  // , Authorization: 'Basic ' + btoa('elastic:altimetrik')
});
@Injectable({
  providedIn: 'root'
})
export class DataSearchService {
  index = 'uhc_v4';
  // hostUrl: any = `http://localhost:9200/${this.index}/_search`;
  hostUrl: any = `http://35.229.120.24:9200/${this.index}/_search`;
  user: any = 'elastic';
  password: any = 'changeme';
  parameters: Parameters;
  results: Array<ResultItem> = new Array<ResultItem>();
  ZipCodeMap: Map<string, string> = new Map();

  constructor(private httpClient: HttpClient) {
    this.ZipCodeMap.set('80303|Boulder|CO|39.989135|-105.22883|-7|1|', '39.989135,-105.22883');
    this.ZipCodeMap.set('55347|Eden Prairie|MN|44.831413|-93.46031|', '-6|1|44.831413,-93.46031');
    this.ZipCodeMap.set('48258|Detroit|MI|42.239933|-83.150823|-5|1|', '42.239933,-83.150823');
    this.ZipCodeMap.set('10124|New York|NY|40.780751|-73.977182|-5|1|', '40.780751,-73.977182');
    this.ZipCodeMap.set('60611|Chicago|IL|41.904667|-87.62504|-6|1|', '41.904667,-87.62504');
    this.ZipCodeMap.set('94175|San Francisco|CA|37.784827|-122.727802|-8|1|', '37.784827,-122.727802');
    this.ZipCodeMap.set('89006|Boulder City|NV|35.927901|-114.972061|-8|1|', '35.927901,-114.972061');
    this.ZipCodeMap.set('90062|Los Angeles|CA|34.003213|-118.3078|-8|1|', '34.003213,-118.3078');
    this.ZipCodeMap.set('85038|Phoenix|AZ|33.276539|-112.18717|-7|0|', '33.276539,-112.18717');
    this.ZipCodeMap.set('43232|Columbus|OH|39.924213|-82.86563|-5|1|', '39.924213,-82.86563');
    this.ZipCodeMap.set('19111|Philadelphia|PA|40.057661|-75.08018|-5|1|', '40.057661,-75.08018');
    this.ZipCodeMap.set('37230|Nashville|TN|36.186605|-86.785248|-6|1|', '36.186605,-86.785248');
    this.ZipCodeMap.set('28299|Charlotte|NC|35.26002|-80.804151|-5|1|', '35.26002,-80.804151');
    this.ZipCodeMap.set('31626|Boston|GA|30.782963|-83.78882|-5|1|', '30.782963,-83.78882');
    this.ZipCodeMap.set('84104|Salt Lake City|UT|40.750628|-111.94077|-7|1|', '40.750628,-111.94077');
    this.ZipCodeMap.set('98158|Seattle|WA|47.432251|-121.803388|-8|1|', '47.432251,-121.803388');
    this.ZipCodeMap.set('97230|Portland|OR|45.539473|-122.50488|-8|1|', '45.539473,-122.50488');
    this.parameters = new Parameters();
    this.getResultItems().subscribe(s => this.getResults(s));
  }

  getDummyRecords(): ResultItem[] {
    return null;
  }

  public setParameters(p: Parameters) {
    this.parameters = p;
    // this.parameters.languageMap = new Map<string, boolean>();
    //
    // // this.parameters.languageMap.set('English', false);
    // this.parameters.languageMap.set('Arabic', false);
    // this.parameters.languageMap.set('Spanish', false);
    // this.parameters.languageMap.set('German', false);
    // this.parameters.languageMap.set('Romanian', false);
    // this.parameters.languageMap.set('French', false);
    // this.parameters.languageMap.set('Hindi', false);
    // this.parameters.languageMap.set('Italian', false);
    // this.parameters.languageMap.set('Russian', false);
    // this.parameters.languageMap.set('Korean', false);
    // this.parameters.languageMap.set('Portugese', false);
    // this.parameters.languageMap.set('Chinese', false);
    // this.parameters.languageMap.set('Egyptian', false);
    // this.parameters.languageMap.set('Farsi', false);
    // this.parameters.languageMap.set('Polish', false);
    // this.parameters.languageMap.set('Greek', false);
    //
    // for (const s of p.languageSponeken) {
    //   this.parameters.languageMap.set(s, true);
    // }
    //
    // this.parameters.specializationMap = new Map<string, boolean>();
    //
    // this.parameters.specializationMap.set('OralSurgeon', false);
    // this.parameters.specializationMap.set('Endodontist', false);
    // this.parameters.specializationMap.set('Maxillofacial Surgeon', false);
    // this.parameters.specializationMap.set('Pediatric', false);
    //
    // for (const s of p.specialization) {
    //   this.parameters.specializationMap.set(s, true);
    // }

    console.log(this.parameters);
  }
  public getParameters() {
    return this.parameters;
  }

  public getResults(js: JsonObject): ResultItem[] {
    const resItems = new Array<ResultItem>();
    console.log('elastic data:');
    console.log(js);
    console.log('Search Summary: \n' +
    'time taken:' + js.took + ' msec.');
    // 'total records:' + ((js.hits['total'].value === 10000) ? '9999 plus.' : js.hits['total'].value));

    // @ts-ignore
    for ( const j of js.hits.hits) {
      resItems.push(j._source);
    }

    this.results = resItems;
    return resItems;
  }

  public getResult(js: JsonObject): ResultItem {
    let resItem: ResultItem;
    // console.log(js);
    // @ts-ignore
    for ( const j of js.hits.hits) {
      resItem = j._source;
    }
    return resItem;
  }

  // public getRecordByNPI(npi: string): ResultItem {
  //   // tslint:disable-next-line:prefer-for-of
  //   // for ( let i = 0; i < this.results.length; i++) {
  //   //   if (this.results[i].npi === npi) {
  //   //     return this.results[i];
  //   //   }
  //   // }
  // }

  public getRecordByNPIOb(npiValue: string): Observable<JsonObject> {
    npiValue = '1568877207';
    // tslint:disable-next-line:prefer-for-of
    const query: RequestParams = {
      query: {
        must : {
          match: {
            npi: npiValue
          }
        }
      }
    };
    // @ts-ignore
    return this.httpClient.post<JsonObject>(this.hostUrl, query, headers);
  }

  public getResultItems(): Observable<JsonObject> {
    // @ts-ignore
    const AND_LOGIC = [];
    const OR_LOGIC = [];
    // const AND_LOGIC = [{ match: { state: 'AK'}},{ match: { handicapAccessible : 'N'}}];
    // const OR_LOGIC = [{match: { languages:'English'}},{ match: { languages:'Egyptian'}}];
    if (this.parameters.plans !== undefined) { AND_LOGIC.push({ match_phrase: { plans: this.parameters.plans}}); }
    // if (this.parameters.specialization !== undefined) { AND_LOGIC.push({ match: { specialization: this.parameters.specialization}});}
    if (this.parameters.acceptingNew === true) { AND_LOGIC.push({ match: { acceptingNew: 'Y'}}); }
    if (this.parameters.firstName !== undefined && this.parameters.firstName === '') {
      AND_LOGIC.push({ match: { firstName: this.parameters.firstName}});
    }
    if (this.parameters.lastName !== undefined && this.parameters.lastName !== '') {
      AND_LOGIC.push({ match: { lastName: this.parameters.lastName}});
    }
    if (this.parameters.extendedHrsWeek === true) {
      AND_LOGIC.push({ match: { extendedHrsWeek: 'Y'}});
    }
    if (this.parameters.extendedHrsSat === true) {
      AND_LOGIC.push({ match: { extendedHrsSat: 'Y'}});
    }
    if (this.parameters.gender !== undefined) { AND_LOGIC.push({ match: { gender: this.parameters.gender}}); }
    if (this.parameters.handicapAccessible === true) {
      AND_LOGIC.push({ match: { handicapAccessible: 'Y'}});
    }
    const LANG_LOGIC = [];
    LANG_LOGIC.push({ match_phrase: { languages: 'English'}});
    for (const key of this.parameters.languageMap.keys()) {
      if ( key !== undefined && this.parameters.languageMap.get(key) === true) {
        LANG_LOGIC.push({ match_phrase: { languages: key}});
      }
    }
    AND_LOGIC.push({
      bool: {
      must: [{
        bool: {
          should: [ LANG_LOGIC ]
        }
      }]
      }
    });

    for (const key of this.parameters.specializationMap.keys()) {
      if ( key !== undefined && this.parameters.specializationMap.get(key) === true) {
        AND_LOGIC.push({ match_phrase: { specialization: key}});
      }
    }
    // AND_LOGIC.push({ match: { languages: 'English'}});
    if ( OR_LOGIC.length === 0) {
      OR_LOGIC.push({ match: { languages: 'English'}} );
    }
    const reg = new RegExp(/^\d*$/);
    if (reg.test(this.parameters.location)) {
      console.log(`${this.parameters.location} must be a zip code`);
    }
    let dist = '99999km';
    let loc = '62.298254,-149.87542';
    let latlong = false;
    if (this.parameters.location !== undefined && this.parameters.location.trim() !== '') {
      // tslint:disable-next-line:variable-name
      const city_state: string[] = this.parameters.location.toLowerCase().split(',', 2);
      if (reg.test(this.parameters.location.replace(/\s/g, '')) === true) {
        AND_LOGIC.push({ match_phrase: { zip: this.parameters.location}});
      } else if (city_state.length === 1) {
        AND_LOGIC.push({ match_phrase: { city: city_state[0].toUpperCase().trim()}});
      } else {
        // tslint:disable-next-line:variable-name
        for (const k of this.ZipCodeMap.keys()) {
          // console.log(k.toLowerCase().includes(city_state[0]));
          // console.log(k.toLowerCase().includes(city_state[1]));
          const key = k.toLowerCase();
          if (key.includes(city_state[0].trim()) && key.includes('|' + city_state[1].trim() + '|')) {
            loc = this.ZipCodeMap.get(k);
            console.log( 'latlong is:' + this.ZipCodeMap.get(k));
            dist = '5km';
            latlong = true;
            // console.log('found!!!!');
            break;
          }
        }
        if ( latlong === false) {
          AND_LOGIC.push({ match_phrase: { city: city_state[0].toUpperCase().trim()}});
          if (city_state.length === 2 && city_state[0].trim() !== '' ) {
            AND_LOGIC.push({ match_phrase: { state: city_state[1].toUpperCase().trim()}});
          }
        }
        console.log('used Lat longs');
        console.log(city_state);
        console.log(loc + ',' + dist);
      }
    }


    // this.parameters.distanceFromYourAddress = '9';
    // this.parameters.location = '62.298254,-149.87542';
    if ( this.parameters.distanceFromYourAddress !== undefined && latlong === true && this.parameters.distanceFromYourAddress !== '0') {
      dist = '' + this.parameters.distanceFromYourAddress + 'mi';
    }

    const NOT_LOGIC = {range: {latConfidence: { lte: -1 }}};
    const paraQuery: RequestParams.Search = {
      query: {
      bool: {
        must: [ AND_LOGIC ],
        must_not: [ NOT_LOGIC ],
        should: [ OR_LOGIC ],
        filter: {
          geo_distance : {
            distance : dist,
            location : loc
            }
          }
        }
      }
    };

    console.log(paraQuery);
    const size = '25';
    // @ts-ignore
    return this.httpClient.post<JsonObject>(`${this.hostUrl}?size=${size}`, paraQuery, headers);
  }

  getRecordByNPI(npi: string): ResultItem {
    for (const item of this.results) {
      if (item.npi === npi) {
        return item;
      }
    }
    return null;
  }
}
