import {BoFieldRef, BoFieldType} from '@finance.workspace/shared/model';

export interface FormFieldRef {
  fieldId: string;
  type: BoFieldType;
  orderIndex: number;
  label: string;
}

export const BusinessFieldInstanceF = {
  toBusinessFieldRef(x: FormFieldRef): BoFieldRef {
    return {
      fieldId: x.fieldId,
      orderIndex: x.orderIndex,
      label: x.label,
      type: x.type,
      toShow: true,
      checked: undefined,
    };
  },
};
