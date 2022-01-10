import {BoFieldType, BoNativeFieldType} from '@finance.workspace/shared/model';
import {requireNonNull} from '@finance.workspace/shared/util';

export enum DynamicFilterType {
  DATE_RANGE = 'DATE_RANGE',
  INT_RANGE = 'INT_RANGE',
  INPUT = 'INPUT',
  BO = 'BO',
  OPTION = 'OPTION',
  TIME_RANGE = 'TIME_RANGE',
  ORG_UNIT = 'ORG_UNIT',
  CHECKBOX = 'CHECKBOX',
}

export const DynamicFilterTypeF = {

  fromFormFieldType(type: BoFieldType): DynamicFilterType {
    requireNonNull(type, 'type');
    checkUnsupportedFormFieldType(type);

    switch (type) {

      case BoFieldType.BO:
        return DynamicFilterType.BO;
      case BoFieldType.INPUT_NUMBER:
        return DynamicFilterType.INT_RANGE;
      case BoFieldType.INPUT_EMAIL:
      case BoFieldType.INPUT_PHONE:
      case BoFieldType.INPUT_TEXT:
      case BoFieldType.TEXTAREA:
        return DynamicFilterType.INPUT;
      case BoFieldType.RADIO_BUTTON_GROUP:
      case BoFieldType.DROPDOWN_SINGLE:
        return DynamicFilterType.OPTION;
      case BoFieldType.CHECKBOX:
        return DynamicFilterType.CHECKBOX;
      case BoFieldType.PERIOD:
      case BoFieldType.DATE:
      case BoFieldType.YEAR:
      case BoFieldType.YEAR_AND_MONTH:
      case BoFieldType.FULL_DATE:
        return DynamicFilterType.DATE_RANGE;
      case BoFieldType.PERIOD_TIME:
      case BoFieldType.TIME:
        return DynamicFilterType.TIME_RANGE;

      default:
        throw new Error('type: ' + type + ' has not matching DynamicFilterType');
    }
  },

  fromNativeFieldType(type: BoNativeFieldType): DynamicFilterType {
    requireNonNull(type, 'type');

    switch (type) {

      case BoNativeFieldType.CREATED_AT:
      case BoNativeFieldType.LAST_MODIFIED_AT:
        return DynamicFilterType.DATE_RANGE;
      case BoNativeFieldType.CREATED_BY:
      case BoNativeFieldType.LAST_MODIFIED_BY:
      case BoNativeFieldType.PARTICIPANTS:
        return DynamicFilterType.ORG_UNIT;

    }
  },

};

function checkUnsupportedFormFieldType(type: BoFieldType) {
  const unsupportedFormFieldTypes = new Set<BoFieldType>();
  unsupportedFormFieldTypes.add(BoFieldType.CHECKLIST);
  unsupportedFormFieldTypes.add(BoFieldType.FILE_UPLOAD);
  unsupportedFormFieldTypes.add(BoFieldType.TAB_GROUP);

  if (unsupportedFormFieldTypes.has(type)) {
    throw new Error('FormFieldType: `' + type + '` is unsupported');
  }
}
