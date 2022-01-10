import {Subject} from 'rxjs';
import {DfConfig} from './DfConfig';
import {DffControl} from './DffControl';
import {Observable} from 'rxjs/internal/Observable';
import {requireNonNull} from '@finance.workspace/shared/util';
import {ElementRef} from '@angular/core';
import {DffValue} from './DffValue';

export class DfControl<T> {
  public readonly value: { [key: string]: string; } = {};

  private readonly valueChangedSubject = new Subject<{ fieldId: string, value: string }>();
  public readonly valueChanged: Observable<{ fieldId: string, value: string }> = this.valueChangedSubject.asObservable();

  private readonly focusChangedSubject = new Subject<{ fieldId: string, focused: boolean }>();
  public readonly focusChanged = this.focusChangedSubject.asObservable();

  private readonly fieldMap = new Map<string, DffControl<T>>();

  public isValid = true;

  constructor(
    readonly config: DfConfig<T>,
  ) {
    requireNonNull(config.dffComponentResolver, 'GY5smKtH');

    config.idF = config.idF ?? ((field) => field['fieldId']);
    config.valueF = config.valueF ?? ((field) => field['value']);
    config.gridPositionF = config.gridPositionF ?? ((field) => field['gridPosition']);
    config.hideF = config.hideF ?? ((field) => !!field['tabId']);
    config.needGridSort = config.needGridSort ?? true;

    for (const field of config.fields) {
      const fieldControl = new DffControl<T>(
        this,
        field,
        config.dffValueF(field, config.valueF(field)),
        config.validatorF(field),
        config.asyncValidatorF(field),
      );
      this.fieldMap.set(config.idF(field), fieldControl);
    }
  }

  get fields(): T[] {
    return this.config.fields;
  }

  get dffResolver() {
    return this.config.dffComponentResolver;
  }

  setValue(fieldId: string, value: string, config?: { runValidators: boolean }) {
    this.value[fieldId] = value;
    const field = this.getOrElseThrow(fieldId);
    field.setValue(this.config.dffValueF(field.raw, value), config);
  }

  reset(fieldId: string) {
    this.value[fieldId] = undefined;
    const field = this.getOrElseThrow(fieldId);
    field.reset();
  }

  getValue(fieldId: string): string {
    const field = this.getOrElseThrow(fieldId);
    return field.getValue().storedValue();
  }

  getElRef(fieldId: string): ElementRef {
    const field = this.getOrElseThrow(fieldId);
    return field.elRef;
  }

  changeValue(field: T, value: DffValue): void {
    const fieldId = this.config.idF(field);
    const storedValue = value.storedValue();
    this.value[fieldId] = storedValue;
    this.valueChangedSubject.next({ fieldId, value: storedValue });
  }

  reduceValidStatus() {
    this.isValid = true;
    for (const fieldControl of this.fieldMap.values()) {
      this.isValid = this.isValid && fieldControl.isValid;
      if (!this.isValid) {
        return;
      }
    }
  }

  markAsTouched() {
    let notScrolled = true;
    for (const fieldControl of this.fieldMap.values()) {
      fieldControl.touch();
      if (notScrolled && !fieldControl.isValid) {
        fieldControl.scrollToElement();
        notScrolled = false;
      }

    }
  }

  completeValueChanged() {
    this.valueChangedSubject.complete();
  }

  changeFocus(field: T, focused: boolean) {
    const fieldId = this.config.idF(field);
    this.focusChangedSubject.next({ fieldId, focused });
  }

  private getOrElseThrow(fieldId: string): DffControl<T> {
    const field = this.fieldMap.get(fieldId);

    if (!field) {
      throw new Error('E6W2tJBF :: Form field not found by id: ' + fieldId);
    }

    return field;
  }

  getField(field: T): DffControl<T> {
    const fieldId = this.config.idF(field);
    return this.getOrElseThrow(fieldId);
  }
}
