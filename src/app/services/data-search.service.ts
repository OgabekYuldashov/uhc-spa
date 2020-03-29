import { Injectable } from '@angular/core';
import {ResultItem} from '../models/ResultItem';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestParams} from 'elasticsearch';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {Observable} from 'rxjs';
import {Parameters} from "../models/parameters";

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
  results: Array<ResultItem>;
  parameters: Parameters;

  constructor(private httpClient: HttpClient) {
    this.connect();
    this.getResults();
  }

  connect() {
  }

  getDummyRecords(): ResultItem[] {
    return this.results;
  }

  public getParameters(p: Parameters) {
    this.parameters = p;
  }

  public getResults(): Observable<ResultItem[]> {
    const searchParams: RequestParams.Search = {
        query: {
          match: { city: 'chicago' }
        }
    };
    const matchQ = {
      // state: 'AK',
      npi: '1720135999'
    };

    this.results = new Array<ResultItem>();
    const query0: RequestParams.Search = {
      query: {
        bool : {
          must: {
            match: matchQ
          },
          filter : {
            geo_distance : {
              distance : '1km',
              location : '61.22016475,-149.7336659'
            }
          }
        }
      }
    };

    query0.size = 5;
    query0.from = 0;
    // query0.bool.must.match.add('npi', '1720135999');

    const query: RequestParams = {
      size: 10,
      from: 0
    };
    // @ts-ignore
    return this.httpClient.post<JsonObject>(this.hostUrl, query0, headers).map(s => {
      // @ts-ignore
      // for (const k of s.hits.hits) {
      //   // console.log(k);
      //   let res = new ResultItem();
      //   // console.log(k._source);
      //   res = k._source;
        this.results.push(res);
      // }
      // console.log(this.results);
        return s.hits.hits._source;
    });
  }

  public getRecordByNPI(npi: string): ResultItem {
    // tslint:disable-next-line:prefer-for-of
    for ( let i = 0; i < this.results.length; i++) {
      if (this.results[i].npi === npi) {
        return this.results[i];
      }
    }
  }
}
