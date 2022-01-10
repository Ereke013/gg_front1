import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminNavigationComponent} from "./admin-navigation.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [AdminNavigationComponent],
  exports: [
    AdminNavigationComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        TranslateModule,
    ]
})
export class AdminNavigationModule { }
