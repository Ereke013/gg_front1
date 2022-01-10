import {
  BoFieldArchetype,
  BoFieldType,
  BoFieldViewType,
  BoNativeFieldType,
  BoWidgetType,
  BusinessFieldKind,
  FieldOption,
  FieldTab,
  FormFieldRef,
} from '@finance.workspace/shared/model';
import {GridPosition} from '@finance.workspace/dynamic-form';

export interface FormField {

  fieldId: string;
  label: string;
  value: string;
  orderIndex: number;
  gridPosition: GridPosition;
  type: BoFieldType;
  isReadonly: boolean;
  isAppendable: boolean;
  isRequired: boolean;
  isRequiredAll: boolean;
  isUnique: boolean;
  options: FieldOption[];
  businessObjectId: string;
  objectFields: FormFieldRef[];
  viewType: BoFieldViewType;
  kind: BusinessFieldKind;
  code: string;
  isKindAddForSelect: boolean;

  costCalcEnabled: boolean;
  costCalcFieldId: string;
  costCalcPriceLabel: string;

  tabs: FieldTab[];
  tabId: string;

  boFieldArchetype: BoFieldArchetype;
  nativeFieldType: BoNativeFieldType;
  widgetType: BoWidgetType;

  params?: unknown;
}
