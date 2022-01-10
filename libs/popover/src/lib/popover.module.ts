import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopoverComponent} from './popover.component';
import {PopoverArrowComponent} from './popover-arrow.component';
import {Popover} from './popover.service';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [PopoverComponent, PopoverArrowComponent],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  providers: [Popover],
})
export class PopoverModule {}
