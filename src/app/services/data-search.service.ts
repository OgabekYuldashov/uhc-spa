import {Injectable} from '@angular/core';
import {ResultItem} from '../models/ResultItem';
import {Parameters} from '../models/parameters';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSearchService {


  const
  remoteUrl = 'http://35.203.22.139:9200/uhc_v4/_search';

  constructor(private  httpClient: HttpClient) {
  }

  getDummyRecords(): ResultItem[] {

    const item = new ResultItem(
    );

    return null;
  }

  // tslint:disable-next-line:variable-name
  getResults(parameter_list: Parameters): Observable<ResultItem> {
    return this.httpClient.post<ResultItem>(this.remoteUrl , parameter_list);
  }
}
