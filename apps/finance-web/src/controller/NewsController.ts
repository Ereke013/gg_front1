import { Injectable } from '@angular/core';
import { HttpService } from '../../../../libs/http-service/src';
import { TablePaging } from '../models/filter/TablePaging';
import { NewsRecord } from '../models/news/NewsRecord';
import {RequestNewsRecord} from "../models/news/RequestNewsRecord";

@Injectable({ providedIn: 'root' })
export class NewsController {

  constructor(private http: HttpService) {
    this.http = http.setControllerPrefix('news');
  }

  getNews(filter: TablePaging): Promise<RequestNewsRecord> {
    return this.http.get<RequestNewsRecord>('/get-news', { filter })
      .toPromise()
      .then(res => res.body);
  }

  getSingleNews(id: number): Promise<NewsRecord> {
    return this.http.get<NewsRecord>('/get-single-news', { id })
      .toPromise()
      .then(res => res.body);
  }
}

