import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditNewsComponent } from './edit-news.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ImageCacheModule } from '../../../directives/image-cache.module';



@NgModule({
  declarations: [EditNewsComponent],
  imports: [
    CommonModule,
    QuillModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    ImageCacheModule
  ]
})
export class EditNewsModule { }
