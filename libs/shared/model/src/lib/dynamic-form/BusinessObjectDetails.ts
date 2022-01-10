import {BoTab, FormField} from '@finance.workspace/shared/model';
import {BusinessObjectKind} from './BusinessObjectKind';

export interface BusinessObjectDetails {
  id: string;
  name: string;
  nameReadonly: boolean;
  recordName: string;
  recordNameReadonly: boolean;
  fields: FormField[];
  kind: BusinessObjectKind;
  boTabs: BoTab[];
  isCalendarEnabled: boolean;
}
