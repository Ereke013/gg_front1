import {Component, ElementRef, NgModule} from '@angular/core';
import {AbstractDffDirectiveFormField} from '@finance-web/shared/dff/AbstractDffDirectiveFormField';
import {CommonModule} from '@angular/common';
import {SingleTabModule} from '@finance-web/shared/single-tab/single-tab.module';
import {OverlaySignatureModule} from '@finance-web/shared/overlay-signature/overlay-signature.module';
import {DffData} from '@finance-web/shared/dff/DffData';
import {Popover} from '@finance.workspace/popover';
import {DffControl} from '@finance.workspace/dynamic-form';
import {BoiDialogType, FormField} from '@finance.workspace/shared/model';

@Component({
  templateUrl: './dff-signature.component.html',
  styleUrls: ['./dff-signature.component.scss'],
})
export class DffSignatureComponent extends AbstractDffDirectiveFormField {
  constructor(
    elRef: ElementRef,
    popover: Popover,
    dffControl: DffControl<FormField>,
    public readonly data: DffData,
  ) {
    super(elRef, popover, dffControl);
  }

  get boiForCreate(): boolean {
    return this.data.dialogType === BoiDialogType.CREATE;
  }
}

@NgModule({
  declarations: [DffSignatureComponent],
  imports: [
    CommonModule,
    SingleTabModule,
    OverlaySignatureModule,
  ],
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Module {}
