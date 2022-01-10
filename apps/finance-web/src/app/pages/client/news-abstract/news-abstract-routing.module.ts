import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsAbstractComponent } from './news-abstract.component';

const routes: Routes = [
  {
    path: '',
    component: NewsAbstractComponent
  },
  {
    path: 'full-news',
    loadChildren: () => import('@finance-web/app/pages/client/news-full-screen/news-full-screen.module').then(m => m.NewsFullScreenModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NewsAbstractRoutingModule {
}
