import {Component, HostBinding, NgModule} from '@angular/core';
import {QuillModule, SelectionChange} from 'ngx-quill';
import {QUILL_EDITOR_CONFIG} from '@finance.workspace/shared/util';
import {DffValueTextarea} from '@finance.workspace/shared/model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {ErrorPopoverModule} from '@finance.workspace/error-popover';
import {FlexModule} from '@angular/flex-layout';
import {DffLabelModule} from '@finance-web/shared/dff/dff-label/dff-label.module';
import {AbstractDffDirectiveFormField} from '@finance-web/shared/dff/AbstractDffDirectiveFormField';

@Component({
  templateUrl: './dff-textarea.component.html',
  styleUrls: ['./dff-textarea.component.scss'],
})
export class DffTextareaComponent extends AbstractDffDirectiveFormField {

  readonly quillConfig = QUILL_EDITOR_CONFIG;

  get val(): DffValueTextarea {
    return super.val;
  }

  selectionChanged($event: SelectionChange) {
    if ($event.range == null) {
      this.touch();
    }
  }

  @HostBinding('style.flex-direction') get flexDirection() {
    return this.oneLineMode ? 'row' : 'column';
  }

  get oneLineMode() {
    return this.f.gridPosition?.rows <= 2;
  }
}

@NgModule({
  declarations: [DffTextareaComponent],
  imports: [
    CommonModule,
    QuillModule,
    FormsModule,
    TranslateModule,
    MatIconModule,
    ErrorPopoverModule,
    FlexModule,
    DffLabelModule,
  ],
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Module {}
