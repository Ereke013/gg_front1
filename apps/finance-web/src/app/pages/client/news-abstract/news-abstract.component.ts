import {Component, OnInit} from '@angular/core';
import {NewsController} from '../../../../controller/NewsController';
import {TablePaging} from '../../../../models/filter/TablePaging';
import {Router} from '@angular/router';
import {RequestNewsRecord} from "../../../../models/news/RequestNewsRecord";

@Component({
  selector: 'app-news-abstract',
  templateUrl: './news-abstract.component.html',
  styleUrls: ['./news-abstract.component.scss']
})
export class NewsAbstractComponent implements OnInit {

  paging: TablePaging = {limit: 10, offset: 0};
  news: RequestNewsRecord = {
    loadMore: false,
    newsList: []
  };

  constructor(private newsController: NewsController,
              private router: Router) {
  }

  async ngOnInit() {
    await this.newsController.getNews(this.paging).then(x => {
      this.news = x;
    });
  }

  openCurrentNews(index: number) {
    this.router.navigate(['/news/full-news'], {
      state: {data: this.news.newsList[index]},
      queryParams: {id: this.news.newsList[index].id}
    }).then();
  }

  async loadMoreNews() {
    if (this.news.loadMore) {
      this.paging.limit += 10;
      this.paging.offset += 10;
      await this.newsController.getNews(this.paging).then(x => {
        for(const ai of x.newsList) {
          this.news.newsList.push(ai);
        }
        this.news.loadMore = x.loadMore;
      });
    }
  }
}
