import {
  arrayToStr,
  dateToStr,
  nullToEmptyStr,
  objectToStr,
  requireNonNull,
  strToArray,
  strToDate,
  strToObject,
} from '@finance.workspace/shared/util';
import {BoFieldType} from '../BoFieldType';
import {FormField} from '../FormField';
import {BoNativeFieldType, BoWidgetType, Coordinate, ChecklistItem} from '@finance.workspace/shared/model';
import {DffValue} from '@finance.workspace/dynamic-form';

export const DffValueF = {

  parse(field: FormField, str: string): DffValue {

    switch (field.nativeFieldType) {
      case BoNativeFieldType.CREATED_AT:
      case BoNativeFieldType.LAST_MODIFIED_AT:
        return new DffValueDateAt().parse(str);
      case BoNativeFieldType.CREATED_BY:
      case BoNativeFieldType.LAST_MODIFIED_BY:
        return new DffValuePerson().parse(str);
    }

    switch (field.widgetType) {
      case BoWidgetType.SIGNATURE:
        return new DffValueSignature().parse(str);
      case BoWidgetType.BUTTON:
        return new DffValueButton().parse(str);
    }

    requireNonNull(field.type, 'l0OKD4qP');
    switch (field.type) {

      case BoFieldType.INPUT_TEXT:
        return new DffValueInputText().parse(str);
      case BoFieldType.INPUT_PHONE:
        return new DffValueInputPhone().parse(str);
      case BoFieldType.INPUT_EMAIL:
        return new DffValueInputEmail().parse(str);
      case BoFieldType.INPUT_NUMBER:
        return new DffValueInputNumber().parse(str);
      case BoFieldType.TEXTAREA:
        return new DffValueTextarea().parse(str);
      case BoFieldType.TIME:
        return new DffValueTime().parse(str);
      case BoFieldType.FULL_DATE:
        return new DffValueFullDate().parse(str);
      case BoFieldType.YEAR_AND_MONTH:
        return new DffValueYearAndMonth().parse(str);
      case BoFieldType.YEAR:
        return new DffValueYear().parse(str);
      case BoFieldType.DATE:
        return new DffValueDate().parse(str);
      case BoFieldType.PERIOD:
        return new DffValuePeriod().parse(str);
      case BoFieldType.PERIOD_TIME:
        return new DffValuePeriodTime().parse(str);
      case BoFieldType.CHECKBOX:
        return new DffValueCheckbox().parse(str);
      case BoFieldType.DROPDOWN_SINGLE:
        return new DffValueDropdownSingle().parse(str);
      case BoFieldType.FILE_UPLOAD:
        return new DffValueFileUpload().parse(str);
      case BoFieldType.CHECKLIST:
        return new DffValueChecklist().parse(str);
      case BoFieldType.RADIO_BUTTON_GROUP:
        return new DffValueRadioButtonGroup().parse(str);
      case BoFieldType.BO:
        return new DffValueBusinessObject().parse(str);
      case BoFieldType.TAB_GROUP:
        return new DffValueTabGroup().parse(str);
      case BoFieldType.GEO_POINT:
        return new DffValueGeoPoint().parse(str);
    }

  },

};

export class DffValueInputText implements DffValue {
  constructor(
    public value?: string,
  ) {}

  parse(str: string): DffValue {
    this.value = nullToEmptyStr(str);
    return this;
  }

  storedValue(): string {
    return this.value;
  }

  isEmpty(): boolean {
    return !this.value;
  }
}

export class DffValueInputPhone implements DffValue {
  constructor(
    public value?: string,
  ) {}

  storedValue(): string {
    return this.value;
  }

  parse(str: string): DffValue {
    this.value = nullToEmptyStr(str);
    return this;
  }

  isEmpty(): boolean {
    return !this.value;
  }

}

export class DffValueInputEmail implements DffValue {
  constructor(
    public value?: string,
  ) {}

  storedValue(): string {
    return this.value;
  }

  parse(str: string): DffValue {
    this.value = nullToEmptyStr(str);
    return this;
  }

  isEmpty(): boolean {
    return !this.value;
  }

}

export class DffValueInputNumber implements DffValue {
  constructor(
    public value?: string,
  ) {}

  storedValue(): string {
    return this.value;
  }

  parse(str: string): DffValue {
    this.value = nullToEmptyStr(str);
    return this;
  }

  isEmpty(): boolean {
    return !this.value;
  }

}

export class DffValueTextarea implements DffValue {
  constructor(
    public value?: string,
  ) {}

  storedValue(): string {
    return this.value;
  }

  parse(str: string): DffValue {
    this.value = nullToEmptyStr(str);
    return this;
  }

  isEmpty(): boolean {
    return !this.value;
  }

}

export class DffValueTime implements DffValue {
  constructor(
    public value?: Date,
  ) {}

  parse(str: string): DffValue {
    this.value = strToDate(str);
    return this;
  }

  storedValue(): string {
    return dateToStr(this.value) ?? '';
  }

  isEmpty(): boolean {
    return !this.value;
  }
}

export class DffValueFullDate implements DffValue {
  constructor(
    public value?: Date,
  ) {}

  storedValue(): string {
    return dateToStr(this.value) ?? '';
  }

  parse(str: string): DffValue {
    this.value = strToDate(str);
    return this;
  }

  isEmpty(): boolean {
    return !this.value;
  }
}

export class DffValueYearAndMonth implements DffValue {
  constructor(
    public value?: Date,
  ) {}

  storedValue(): string {
    return dateToStr(this.value) ?? '';
  }

  parse(str: string): DffValue {
    this.value = strToDate(str);
    return this;
  }

  isEmpty(): boolean {
    return !this.value;
  }

}

export class DffValueYear implements DffValue {
  constructor(
    public value?: Date,
  ) {}

  storedValue(): string {
    return dateToStr(this.value) ?? '';
  }

  parse(str: string): DffValue {
    this.value = strToDate(str);
    return this;
  }

  isEmpty(): boolean {
    return !this.value;
  }

}

export class DffValueDate implements DffValue {
  constructor(
    public value?: Date,
  ) {}

  storedValue(): string {
    return dateToStr(this.value) ?? '';
  }

  parse(str: string): DffValue {
    this.value = strToDate(str);
    return this;
  }

  isEmpty(): boolean {
    return !this.value;
  }

}

export class DffValuePeriod implements DffValue {

  constructor(
    public value?: Date[],
  ) {}

  parse(str: string): DffValue {
    const { startDate, endDate } = strToObject(str);
    this.value = [];
    if (startDate) { this.value[0] = startDate; }
    if (endDate) { this.value[1] = endDate; }
    return this;
  }

  storedValue(): string {
    return objectToStr({ startDate: this.value[0], endDate: this.value[1] });
  }

  isEmpty(): boolean {
    return !this.value || !this.value[0] || !this.value[1];
  }
}

export class DffValuePeriodTime implements DffValue {

  constructor(
    public value?: Date[],
  ) {}

  parse(str: string): DffValue {
    const { startDate, endDate } = strToObject(str);
    this.value = [];
    if (startDate) { this.value[0] = startDate; }
    if (endDate) { this.value[1] = endDate; }
    return this;
  }

  storedValue(): string {
    return objectToStr({ startDate: this.value[0], endDate: this.value[1] });
  }

  isEmpty(): boolean {
    return !this.value || !this.value[0] || !this.value[1];
  }
}

export class DffValueCheckbox implements DffValue {

  constructor(
    public value?: boolean,
  ) {}

  parse(str: string): DffValue {
    this.value = strToObject<boolean>(str);
    return this;
  }

  storedValue(): string {
    return objectToStr(this.value);
  }

  isEmpty(): boolean {
    return !this.value;
  }
}

export class DffValueDropdownSingle implements DffValue {

  constructor(
    public optionId?: string,
  ) {}

  parse(str: string): DffValue {
    this.optionId = nullToEmptyStr(str);
    return this;
  }

  storedValue(): string {
    return this.optionId;
  }

  isEmpty(): boolean {
    return !this.optionId;
  }
}

export class DffValueFileUpload implements DffValue {

  constructor(
    public fileIds?: string[],
  ) {}

  parse(str: string): DffValueFileUpload {
    this.fileIds = strToArray<string>(str);
    return this;
  }

  storedValue(): string {
    return arrayToStr(this.fileIds);
  }

  isEmpty(): boolean {
    return !this.fileIds || this.fileIds.length === 0;
  }
}

export class DffValueChecklist implements DffValue {

  constructor(
    public items?: ChecklistItem[],
  ) {}

  parse(str: string): DffValue {
    this.items = strToArray<ChecklistItem>(str);
    return this;
  }

  storedValue(): string {
    return arrayToStr(this.items);
  }

  isEmpty(): boolean {
    return !this.items || this.items.length === 0;
  }
}

export class DffValueRadioButtonGroup implements DffValue {

  constructor(
    public optionId?: string,
  ) {}

  parse(str: string): DffValue {
    this.optionId = nullToEmptyStr(str);
    return this;
  }

  storedValue(): string {
    return this.optionId;
  }

  isEmpty(): boolean {
    return !this.optionId;
  }
}

export class DffValueBusinessObject implements DffValue {

  constructor(
    public boInstanceIds?: string[],
  ) {}

  parse(str: string): DffValue {
    this.boInstanceIds = strToArray<string>(str);
    return this;
  }

  storedValue(): string {
    return arrayToStr(this.boInstanceIds);
  }

  isEmpty(): boolean {
    return !this.boInstanceIds || this.boInstanceIds.length === 0;
  }
}

export class DffValueTabGroup implements DffValue {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parse(str: string): DffValue {
    return this;
  }

  storedValue(): string {
    return '';
  }

  isEmpty(): boolean {
    return false;
  }
}

export class DffValueDateAt implements DffValue {
  constructor(
    public value?: Date,
  ) {}

  storedValue(): string {
    return dateToStr(this.value) ?? '';
  }

  parse(str: string): DffValue {
    this.value = strToDate(str);
    return this;
  }

  isEmpty(): boolean {
    return !this.value;
  }
}

export class DffValuePerson implements DffValue {

  constructor(
    public boInstanceId?: string,
  ) {}

  parse(str: string): DffValue {
    this.boInstanceId = str;
    return this;
  }

  storedValue(): string {
    return this.boInstanceId;
  }

  isEmpty(): boolean {
    return !this.boInstanceId;
  }
}

export class DffValueSignature implements DffValue {
  constructor(
    public value?: string,
  ) {}

  parse(str: string): DffValue {
    this.value = nullToEmptyStr(str);
    return this;
  }

  storedValue(): string {
    return this.value;
  }

  isEmpty(): boolean {
    return !this.value;
  }
}

export class DffValueButton implements DffValue {

  constructor(
    public url?: string,
  ) {}

  parse(str: string): DffValue {
    this.url = nullToEmptyStr(str);
    return this;
  }

  storedValue(): string {
    return this.url;
  }

  isEmpty(): boolean {
    return !this.url;
  }
}

export class DffValueGeoPoint implements DffValue {

  constructor(
    public coordinate?: Coordinate,
  ) {}

  parse(str: string): DffValue {
    this.coordinate = strToObject<Coordinate>(str);
    return this;
  }

  storedValue(): string {
    return JSON.stringify(this.coordinate);
  }

  isEmpty(): boolean {
    return !this.coordinate;
  }
}
