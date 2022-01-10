import {
  BoiSelectorRecord,
  BusinessFieldInstanceF,
  BoFieldRef,
  FieldOption,
  FormField,
  BoFieldType,
} from '@finance.workspace/shared/model';

export interface BoFieldFilter {
  id: string;
  fieldId: string;
  type: BoFieldType;

  value: string;
  intFrom: number;
  intTo: number;
  dateFrom: Date;
  dateTo: Date;
  businessObjectId: string;
  businessInstanceId: string;

  // NoJava
  chipsMode: boolean;
  label: string;
  options: FieldOption[];
  businessFields: BoFieldRef[];
  selectedBoInstance: BoiSelectorRecord;

}

export const BoFieldFilterF = {
  create(id: string, record: FormField): BoFieldFilter {
    return {
      id: id,
      fieldId: record.fieldId,
      label: record.label,
      type: record.type,
      options: [...record.options],
      businessFields: record.objectFields.map(BusinessFieldInstanceF.toBusinessFieldRef),
      businessObjectId: record.businessObjectId,
      value: '',
      chipsMode: false,
      intTo: 0,
      intFrom: 0,
      dateFrom: undefined,
      dateTo: undefined,
      selectedBoInstance: undefined,
      businessInstanceId: '',
    };
  },
};
