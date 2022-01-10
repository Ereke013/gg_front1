import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObserversModule} from '@angular/cdk/observers';
import {ExpansionPanelComponent} from './expansion-panel.component';

@NgModule({
  declarations: [ExpansionPanelComponent],
  exports: [
    ExpansionPanelComponent,
  ],
  imports: [
    CommonModule,
    ObserversModule,
  ],
})
export class ExpansionPanelModule {}
