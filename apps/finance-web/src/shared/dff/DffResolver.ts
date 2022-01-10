import {BoFieldType, BoNativeFieldType, BoWidgetType, FormField} from '@finance.workspace/shared/model';
import {requireNonNull} from '@finance.workspace/shared/util';
import {AbstractDffDirective} from '@finance.workspace/dynamic-form';
import {Type} from '@angular/core';

export function dffResolver(formField: FormField): Promise<Type<AbstractDffDirective<FormField>>> {

  requireNonNull(formField, 'slrCAY3ND');

  const nativeType = formField.nativeFieldType;

  if (nativeType === BoNativeFieldType.CREATED_AT || nativeType === BoNativeFieldType.LAST_MODIFIED_AT) {
    return import('./dff-date-at.component').then(x => x.DffDateAtComponent);
  }

  requireNonNull(formField.type, 'vUYdFs3sr');

  const type = formField.type;

  if (isDate(type)) {
    return import('./dff-date-and-time.component').then(x => x.DffDateAndTimeComponent);
  }
  if (type === BoFieldType.TEXTAREA) {
    return import('./dff-textarea.component').then(x => x.DffTextareaComponent);
  }
  if (type === BoFieldType.DROPDOWN_SINGLE) {
    return import('./dff-select.component').then(x => x.DffSelectComponent);
  }
  if (type === BoFieldType.PERIOD) {
    return import('./dff-period.component'  ).then(x => x.DffPeriodComponent);
  }
  if (type === BoFieldType.PERIOD_TIME) {
    return import('./dff-period-time.component'  ).then(x => x.DffPeriodTimeComponent);
  }
  if (type === BoFieldType.RADIO_BUTTON_GROUP) {
    return import('./dff-radio-button-group.component').then(x => x.DffRadioButtonGroupComponent);
  }
  if (type === BoFieldType.FILE_UPLOAD) {
    return import('./dff-file-upload.component' ).then(x => x.DffFileUploadComponent);
  }

  throw new Error('Qqb3wlsIi :: component not found for type `' + type + '`');

}


const isDate: (type: BoFieldType) => boolean = (type) => {
  return type === BoFieldType.DATE
    || type === BoFieldType.FULL_DATE
    || type === BoFieldType.YEAR
    || type === BoFieldType.YEAR_AND_MONTH
    || type === BoFieldType.TIME;
};

const isInput: (type: BoFieldType) => boolean = (type) => {
  return type === BoFieldType.INPUT_PHONE
    || type === BoFieldType.INPUT_EMAIL
    || type === BoFieldType.INPUT_TEXT
    || type === BoFieldType.INPUT_NUMBER;
};

