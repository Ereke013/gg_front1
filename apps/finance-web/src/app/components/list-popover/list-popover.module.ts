import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListPopoverComponent} from "./list-popover.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
    declarations: [ListPopoverComponent],
    exports: [
        ListPopoverComponent
    ],
    imports: [
        CommonModule,
        MatMenuModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        TranslateModule
    ]
})
export class ListPopoverModule { }
