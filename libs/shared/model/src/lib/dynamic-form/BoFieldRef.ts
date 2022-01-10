import {BoFieldType} from './BoFieldType';

export interface BoFieldRef {
  fieldId: string;
  toShow: boolean;
  orderIndex: number;
  label: string;
  type: BoFieldType;

  // NoJava
  checked: boolean;
}
