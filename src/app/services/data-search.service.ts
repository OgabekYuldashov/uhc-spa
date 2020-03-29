import { Injectable } from '@angular/core';
import {ResultItem} from '../models/ResultItem';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestParams} from 'elasticsearch';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
  // , Authorization: 'Basic ' + btoa('elastic:altimetrik')
});
@Injectable({
  providedIn: 'root'
})
export class DataSearchService {
  index = 'uhc_v4';
  hostUrl: any = `http://localhost:9200/${this.index}/_search`;
  // hostUrl: any = `http://34.95.36.224:9200/${this.index}/`;
  user: any = 'elastic';
  password: any = 'changeme';

  constructor(private httpClient: HttpClient) {
    this.connect();
  }

  connect() {
  }

  getDummyRecords(): ResultItem[] {
    const searchParams: RequestParams.Search = {
        query: {
          match: { city: 'chicago' }
        }
    };
    const results: Array<ResultItem> = new Array<ResultItem>();
    const query0: RequestParams.Search = {
      query: {
        bool : {
          must: {
            match: {
              city: 'chicago'
            }
          },
          filter : {
            geo_distance : {
              distance : '200km',
              location : '40,-70'
            }
          }
        }
      }
    };

    const query: RequestParams = {
      size: 10,
      from: 0
    };
    // @ts-ignore
    this.httpClient.post<JsonObject>(this.hostUrl, query, headers).subscribe(s => {
      const j = s;
      // @ts-ignore
      for (const k of j.hits.hits) {
        // console.log(k);
        let res = new ResultItem();
        // console.log(k._source);
        res = k._source;
        results.push(res);
      }
      console.log(results);
    });

    return results;
  }
}
