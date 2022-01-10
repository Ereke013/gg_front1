import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsFullScreenComponent } from './news-full-screen.component';

const routes: Routes = [
  {
    path: '',
    component: NewsFullScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NewsFullScreenRoutingModule {
}
