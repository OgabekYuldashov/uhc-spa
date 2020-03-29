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
    const paraQuery: RequestParams.Search = {
      query: {
        filtered: {
          query: {
            match_all: {}
          },
          filter: {
            term: {plans: this.parameters.plans === undefined ? '*' : this.parameters.plans[0]}
            // term: {specialization:  this.parameters.firstName === undefined ? '*' : this.parameters.specialization[0]},
            // term: {acceptingNew: (this.parameters.acceptingNew === true) ? 'Y' : '*'},
            // term: {firstName: this.parameters.firstName === undefined ? '*' : this.parameters.firstName},
            // term: {lastName: this.parameters.lastName === undefined ? '*' : this.parameters.lastName},
            // term: {extendedHrsWeek: this.parameters.extendedHrsWeek === true ? 'Y' : '*'},
            // term: {extendedHrsSat: this.parameters.extendedHrsSat === true ? 'Y' : '*'},
            // term: {gender: this.parameters.gender},
            // term: {handicapAccessible: this.parameters.handicapAccessible === true ? 'Y' : '*'},
            // term: {languageSponeken: this.parameters.languageSponeken === undefined ? '*' : this.parameters.languageSponeken[0]}
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
}
