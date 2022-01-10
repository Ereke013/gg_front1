import {Component, forwardRef, Inject, InjectionToken, Optional, Type, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {BaseControlValueAccessor} from '@finance.workspace/shared/util';

let nextUniqueId = 0;

export const UI_RADIO_COMPONENT = new InjectionToken<Type<any>>('uiRadioComponent');

@Component({
  selector: 'ui-radio',
  templateUrl: './ui-radio.component.html',
  styleUrls: ['./ui-radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => UiRadioComponent), multi: true },
  ],
})
export class UiRadioComponent extends BaseControlValueAccessor<boolean> {

  id: string = 'ui-radio' + nextUniqueId++;

  constructor(
    @Optional()
    @Inject(UI_RADIO_COMPONENT)
    private readonly component: Type<any>,
  ) {
    super();
    this.value = false;
  }

  get c() {
    return this.component;
  }

  inputChange($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  click() {
    this.onChange(this.value = true);
  }

}
