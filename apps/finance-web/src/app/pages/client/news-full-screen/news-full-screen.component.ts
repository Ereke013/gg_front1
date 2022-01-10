import { Component, OnInit } from '@angular/core';
import { NewsController } from '../../../../controller/NewsController';
import {ActivatedRoute, Router} from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news-full-screen',
  templateUrl: './news-full-screen.component.html',
  styleUrls: ['./news-full-screen.component.scss']
})
export class NewsFullScreenComponent implements OnInit {

  fullText: string;
  description: string;
  titleText: string;
  id: number;

  constructor(private newsController: NewsController,
              private route: ActivatedRoute,
              private router: Router,
              private meta: Meta,
              private title: Title) {
  }

  async ngOnInit() {
    this.id = this.route.snapshot.queryParams.id;
    if (!history.state.data) {
      await this.newsController.getSingleNews(this.id).then(x => {
        this.fullText = x.fullText;
        this.description = x.description;
        this.titleText = x.title;
      });
    } else {
      this.fullText = history.state.data.fullText;
      this.description = history.state.data.description;
      this.titleText = history.state.data.title;
    }

    this.title.setTitle(this.titleText);
    this.meta.addTag({ name: 'description', content: this.description });
  }

  backToNews() {
    this.router.navigate(['/news']).then();
  }
}
