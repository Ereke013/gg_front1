import {BoFieldType} from '@finance.workspace/shared/model';

export interface BoiEventOldAndNewValues {
  fieldId: string;
  label: string;
  type: BoFieldType;
  oldStoredValue: string;
  newStoredValue: string;
  oldDisplayValue: string;
  newDisplayValue: string;
}
