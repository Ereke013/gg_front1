import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { ConsumerCreditModule } from '@finance-web/app/components/consumer-credit/consumer-credit.module';



@NgModule({
  declarations: [FavoritesComponent],
  exports: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    ConsumerCreditModule
  ]
})
export class FavoritesModule { }
