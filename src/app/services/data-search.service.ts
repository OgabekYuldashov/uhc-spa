import { Injectable } from '@angular/core';
import {ResultItem} from '../models/ResultItem';

@Injectable({
  providedIn: 'root'
})
export class DataSearchService {

  constructor() { }

  getDummyRecords(): ResultItem[] {

    const item = new ResultItem(
    );


    return null;
  }
}
