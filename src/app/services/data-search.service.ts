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

  constructor(private httpClient: HttpClient) {
    this.parameters = new Parameters();
    this.parameters.acceptingNew = true;
    this.getResultItems().subscribe(s => this.getResults(s));
  }

  getDummyRecords(): ResultItem[] {
    return null;
  }

  public setParameters(p: Parameters) {
    this.parameters = p;
    this.parameters.languageMap = new Map<string, boolean>();

    // this.parameters.languageMap.set('English', false);
    this.parameters.languageMap.set('Arabic', false);
    this.parameters.languageMap.set('Spanish', false);
    this.parameters.languageMap.set('German', false);
    this.parameters.languageMap.set('Romanian', false);
    this.parameters.languageMap.set('French', false);
    this.parameters.languageMap.set('Hindi', false);
    this.parameters.languageMap.set('Italian', false);
    this.parameters.languageMap.set('Russian', false);
    this.parameters.languageMap.set('Korean', false);
    this.parameters.languageMap.set('Portugese', false);
    this.parameters.languageMap.set('Chinese', false);
    this.parameters.languageMap.set('Egyptian', false);
    this.parameters.languageMap.set('Farsi', false);
    this.parameters.languageMap.set('Polish', false);
    this.parameters.languageMap.set('Greek', false);

    for (const s of p.languageSponeken) {
      this.parameters.languageMap.set(s, true);
    }

    this.parameters.specializationMap = new Map<string, boolean>();

    this.parameters.specializationMap.set('OralSurgeon', false);
    this.parameters.specializationMap.set('Endodontist', false);
    this.parameters.specializationMap.set('Maxillofacial Surgeon', false);
    this.parameters.specializationMap.set('Pediatric', false);

    for (const s of p.specialization) {
      this.parameters.specializationMap.set(s, true);
    }

    console.log(this.parameters);
  }
  public getParameters() {
    return this.parameters;
  }

  public getResults(js: JsonObject): ResultItem[] {
    const resItems = new Array<ResultItem>();
    // console.log(js);
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
    const searchParams: RequestParams.Search = {
      query: {
        match: { city: 'chicago' }
      }
    };
    const matchQ = {
      // state: 'AK',
      npi: '1720135999'
    };
    // @ts-ignore
    const AND_LOGICS = [
        '{ "match": { "state":"AK"}}',
        '{ "match": { "handicapAccessible" : "N"}}'
      ];
    const OR_LOGICS = [
      '{ "match": { "languages":"English"}}',
      '{ "match": { "languages":"Egyptian"}}'
    ];
    const dist = '10000km';
    const loc = '62.298254,-149.87542';
    const paraQuery: RequestParams.Search = {
      query: {
      bool: {
        must: AND_LOGICS,
        should: OR_LOGICS,
        filter: {
          geo_distance : {
            distance : dist,
            location : loc
          }
        }
      }
    }
    };

    // plans: string;
    // location: string;
    // distanceFromYourAddress: string;
    // specialization: string[];
    // acceptingNew: boolean;
    // firstName: string;
    // lastName: string;
    // extendedHrsWeek: boolean;
    // extendedHrsSat: boolean;
    // gender: string;
    // handicapAccessible: boolean;
    // languageSponeken: string[];
    const query0: RequestParams.Search = {
      query: {
        bool : {
          must: {
            match: matchQ
          },
          filter : {
            geo_distance : {
              distance : '100km',
              location : '61.22016475,-149.7336659'
            }
          }
        }
      }
    };

    query0.size = 50;
    query0.from = 0;
    // query0.bool.must.match.add('npi', '1720135999');

    const query: RequestParams = {
      size: 10
    };
    // @ts-ignore
    return this.httpClient.post<JsonObject>(this.hostUrl, query, headers);
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
