import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationComponent} from "./navigation.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [NavigationComponent],
  exports: [
    NavigationComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        TranslateModule,
    ]
})
export class NavigationModule { }
