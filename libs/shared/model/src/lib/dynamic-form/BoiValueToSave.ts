import {requireNonNull} from '@finance.workspace/shared/util';

export class BoiValueToSave {

  constructor(
    public readonly draftId: string,
    public readonly boId: string,
    public readonly boInstanceId: string,
    public readonly values: BoiFieldValueToSave[] = [],
  ) {
    requireNonNull(draftId, '3SuQos37');
    requireNonNull(boId, 'I2sOc9i7');
    requireNonNull(boInstanceId, '1s9pkB1w');
  }

  static of(draftId: string, boId: string, boInstanceId: string) {
    return new BoiValueToSave(draftId, boId, boInstanceId);
  }

  resetValues() {
    this.values.splice(0, this.values.length);
  }

  addValue(fieldId: string, value: string) {
    requireNonNull(fieldId, 'Lpj3iI7PN');
    this.values.push({ fieldId, value });
  }

}

export interface BoiFieldValueToSave {
  fieldId: string;
  value: string;
}
