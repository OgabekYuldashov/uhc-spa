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
    const AND_LOGIC = [];
    const OR_LOGIC = [];
    // const AND_LOGIC = [{ match: { state: 'AK'}},{ match: { handicapAccessible : 'N'}}];
    // const OR_LOGIC = [{match: { languages:'English'}},{ match: { languages:'Egyptian'}}];
    if (this.parameters.plans !== undefined) { AND_LOGIC.push({ match: { plans: this.parameters.plans}});}
    // if (this.parameters.specialization !== undefined) { AND_LOGIC.push({ match: { specialization: this.parameters.specialization}});}
    if (this.parameters.acceptingNew === true) { AND_LOGIC.push({ match: { acceptingNew: 'Y'}});}
    if (this.parameters.firstName !== undefined) { AND_LOGIC.push({ match: { firstName: this.parameters.firstName}});}
    if (this.parameters.lastName !== undefined) { AND_LOGIC.push({ match: { lastName: this.parameters.lastName}});}
    if (this.parameters.extendedHrsWeek === true) {
      AND_LOGIC.push({ match: { extendedHrsWeek: 'Y'}});
    }
    if (this.parameters.extendedHrsSat === true) {
      AND_LOGIC.push({ match: { extendedHrsSat: 'Y'}});
    }
    if (this.parameters.gender !== undefined) { AND_LOGIC.push({ match: { gender: this.parameters.gender}});}
    if (this.parameters.handicapAccessible === true) {
      AND_LOGIC.push({ match: { handicapAccessible: this.parameters.handicapAccessible}});
    }
    for (const key of this.parameters.languageMap.keys()) {
      if (this.parameters.languageMap.get(key) === true) {
        OR_LOGIC.push({ match: { languages: key}});
      }
    }

    for (const key of this.parameters.specializationMap.keys()) {
      if (this.parameters.specializationMap.get(key) === true) {
        AND_LOGIC.push({ match: { specialization: key}});
      }
    }
    AND_LOGIC.push({ match: { languages: 'English'}});
    OR_LOGIC.push({ match: { languages: 'English'}} );
    let dist = '10000km';
    if ( this.parameters.distanceFromYourAddress !== undefined) {
      dist = this.parameters.distanceFromYourAddress;
    }
    let loc = '62.298254,-149.87542';
    if (this.parameters.location !== undefined) {
      loc = this.parameters.location;
    }

    const NOT_LOGIC = {range: {latConfidence: { lte: 0 }}};
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
    const size = '50';
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
