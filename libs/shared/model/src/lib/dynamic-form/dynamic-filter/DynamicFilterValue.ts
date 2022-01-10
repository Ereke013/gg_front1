/* eslint-disable */
import {
  BoFieldFilter,
  BoFieldRef,
  BoiSelectorRecord,
  BoNativeFieldFilter,
  DynamicFilterType,
  FieldOption,
  OrgUnitId,
  OrgUnitRecord,
} from '@finance.workspace/shared/model';
import {
  asDate,
  nullToEmptyStr,
  objectToStr,
  requireNonEmptyArray,
  requireNonNull,
  strToObject,
  unsupportedOperation,
} from '@finance.workspace/shared/util';
import {DatePipe} from '@angular/common';

export interface DynamicFilterValue {
  assignToDynamicFilter(filter: BoFieldFilter);

  assignToNativeFilter(filter: BoNativeFieldFilter);

  toText(): string;
}

export class DynamicFilterValueInput implements DynamicFilterValue {
  constructor(
    public value?: string,
  ) {}

  assignToDynamicFilter(filter: BoFieldFilter) {
    filter.value = this.value;
  }

  assignToNativeFilter(filter: BoNativeFieldFilter) {
    throw unsupportedOperation();
  }

  toText(): string {
    return nullToEmptyStr(this.value);
  }

}

export class DynamicFilterValueDateRange implements DynamicFilterValue {
  constructor(
    public start?: Date,
    public end?: Date,
  ) {}

  assignToDynamicFilter(filter: BoFieldFilter) {
    filter.dateFrom = this.start;
    filter.dateTo = this.end;
  }

  assignToNativeFilter(filter: BoNativeFieldFilter) {
    filter.dateFrom = this.start;
    filter.dateTo = this.end;
  }

  toText(): string {
    return nullToEmptyStr(datePipe.transform(this.start, 'dd.MM.yyyy'))
      + ' - '
      + nullToEmptyStr(datePipe.transform(this.end, 'dd.MM.yyyy'));
  }

}

export class DynamicFilterValueTimeRange implements DynamicFilterValue {
  constructor(
    public start?: Date,
    public end?: Date,
  ) {}

  assignToDynamicFilter(filter: BoFieldFilter) {
    filter.dateFrom = this.start;
    filter.dateTo = this.end;
  }

  assignToNativeFilter(filter: BoNativeFieldFilter) {
    throw unsupportedOperation();
  }

  toText(): string {
    return nullToEmptyStr(datePipe.transform(this.start, 'HH:mm:ss'))
      + ' - '
      + nullToEmptyStr(datePipe.transform(this.end, 'HH:mm:ss'));
  }

}

export class DynamicFilterValueIntRange implements DynamicFilterValue {
  constructor(
    public from?: number,
    public to?: number,
  ) {}

  assignToDynamicFilter(filter: BoFieldFilter) {
    filter.intFrom = this.from;
    filter.intTo = this.to;
  }

  assignToNativeFilter(filter: BoNativeFieldFilter) {
    throw unsupportedOperation();
  }

  toText(): string {
    return nullToEmptyStr(this.from) + ' - ' + nullToEmptyStr(this.to);
  }

}

export class DynamicFilterValueOption implements DynamicFilterValue {
  constructor(
    public optionId?: string,
    public readonly options?: FieldOption[],
  ) {
    requireNonNull(options, '1eY1kMjd');
  }

  assignToDynamicFilter(filter: BoFieldFilter) {
    filter.value = this.optionId;
  }

  assignToNativeFilter(filter: BoNativeFieldFilter) {
    throw unsupportedOperation();
  }

  toText(): string {
    const fieldOption = this.options.find(x => x.id === this.optionId);
    return fieldOption ? fieldOption.label : '';
  }

}

export class DynamicFilterValueCheckbox implements DynamicFilterValue {
  constructor(
    public checked?: boolean,
  ) {}

  assignToDynamicFilter(filter: BoFieldFilter) {
    filter.value = objectToStr(this.checked);
  }

  assignToNativeFilter(filter: BoNativeFieldFilter) {
    throw unsupportedOperation();
  }

  toText(): string {
    return this.checked ? 'Да' : 'Нет';
  }

}

export class DynamicFilterValueBo implements DynamicFilterValue {
  constructor(
    public boInstanceId: string,
    public boId: string,
    public fields: BoFieldRef[],
    public record: BoiSelectorRecord,
  ) {
    requireNonNull(boId, 'boId');
    requireNonEmptyArray(fields, 'fields');
  }

  assignToDynamicFilter(filter: BoFieldFilter) {
    filter.businessInstanceId = this.boInstanceId;
  }

  assignToNativeFilter(filter: BoNativeFieldFilter) {
    throw unsupportedOperation();
  }

  toText(): string {
    if (!this.record) { return ''; }
    if (!this.record.displayValues) { return ''; }
    return this.record.displayValues.join(' ');
  }

}

export class DynamicFilterValueOrgUnit implements DynamicFilterValue {
  constructor(
    public orgUnitRecords: OrgUnitRecord[],
    public addOrgUnitIds: OrgUnitId[] = [],
    public delOrgUnitIds: OrgUnitId[] = [],
  ) {
    requireNonNull(orgUnitRecords);
  }

  assignToDynamicFilter(filter: BoFieldFilter) {
    throw unsupportedOperation();
  }

  assignToNativeFilter(filter: BoNativeFieldFilter) {
    filter.orgUnitRecords = [...this.orgUnitRecords];
    filter.addOrgUnitIds = [...this.addOrgUnitIds];
    filter.delOrgUnitIds = [...this.delOrgUnitIds];
  }

  toText(): string {
    return this.orgUnitRecords.map(x => x.name).join(', ');
  }

}

export const DynamicFilterValueF = {

  fromBoFormField(type: DynamicFilterType, filter: BoFieldFilter): DynamicFilterValue {

    requireNonNull(type, 'type');
    requireNonNull(filter, 'filter');

    switch (type) {

      case DynamicFilterType.BO:
        return new DynamicFilterValueBo(
          filter.businessInstanceId,
          filter.businessObjectId,
          filter.businessFields,
          filter.selectedBoInstance);

      case DynamicFilterType.TIME_RANGE:
        return new DynamicFilterValueTimeRange(asDate(filter.dateFrom), asDate(filter.dateTo));

      case DynamicFilterType.OPTION:
        return new DynamicFilterValueOption(filter.value, filter.options);

      case DynamicFilterType.INT_RANGE:
        return new DynamicFilterValueIntRange(filter.intFrom, filter.intTo);

      case DynamicFilterType.DATE_RANGE:
        return new DynamicFilterValueDateRange(asDate(filter.dateFrom), asDate(filter.dateTo));

      case DynamicFilterType.INPUT:
        return new DynamicFilterValueInput(filter.value);

      case DynamicFilterType.CHECKBOX:
        return new DynamicFilterValueCheckbox(strToObject<boolean>(filter.value));

    }

  },

  fromNativeFieldType(type: DynamicFilterType, filter: BoNativeFieldFilter): DynamicFilterValue {

    requireNonNull(type, 'type');
    requireNonNull(filter, 'filter');

    switch (type) {

      case DynamicFilterType.DATE_RANGE:
        return new DynamicFilterValueDateRange(asDate(filter.dateFrom), asDate(filter.dateTo));
      case DynamicFilterType.ORG_UNIT:
        return new DynamicFilterValueOrgUnit(filter.orgUnitRecords ? filter.orgUnitRecords : []);

      default:
        throw new Error(`DynamicFilterValue for type ${type} not found`);
    }

  },

};
const datePipe = new DatePipe('ru');
