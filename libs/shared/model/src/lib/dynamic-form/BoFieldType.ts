export enum BoFieldType {
  INPUT_TEXT = 'INPUT_TEXT',
  INPUT_PHONE = 'INPUT_PHONE',
  INPUT_EMAIL = 'INPUT_EMAIL',
  INPUT_NUMBER = 'INPUT_NUMBER',
  TEXTAREA = 'TEXTAREA',

  TIME = 'TIME',
  FULL_DATE = 'FULL_DATE',
  YEAR_AND_MONTH = 'YEAR_AND_MONTH',
  YEAR = 'YEAR',
  DATE = 'DATE',
  PERIOD = 'PERIOD',
  PERIOD_TIME = 'PERIOD_TIME',

  CHECKBOX = 'CHECKBOX',
  DROPDOWN_SINGLE = 'DROPDOWN_SINGLE',
  FILE_UPLOAD = 'FILE_UPLOAD',
  CHECKLIST = 'CHECKLIST',
  RADIO_BUTTON_GROUP = 'RADIO_BUTTON_GROUP',
  BO = 'BO',
  TAB_GROUP = 'TAB_GROUP',
  GEO_POINT = 'GEO_POINT',
}

export const BoFieldTypeF = {

  getInputType(field: BoFieldType): string {
    if (field === BoFieldType.INPUT_PHONE
      || field === BoFieldType.INPUT_EMAIL
      || field === BoFieldType.INPUT_TEXT) { return 'text'; }

    if (field === BoFieldType.INPUT_NUMBER) { return 'number'; }
  },

  uiValue(field: BoFieldType) {
    return 'form_field_type_' + field.toString().toLowerCase();
  },
};
