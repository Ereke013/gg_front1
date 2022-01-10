import { Component, Input, OnInit } from '@angular/core';
import { NewsRecord } from '../../../models/news/NewsRecord';

@Component({
  selector: 'app-news-abstract-card',
  templateUrl: './news-abstract-card.component.html',
  styleUrls: ['./news-abstract-card.component.scss']
})
export class NewsAbstractCardComponent implements OnInit {

  @Input() news: NewsRecord;

  constructor() {
  }

  ngOnInit(): void {
  }
}
