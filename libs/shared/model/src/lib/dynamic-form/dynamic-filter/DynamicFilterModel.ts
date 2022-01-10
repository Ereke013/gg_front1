import {BoFieldFilter, BoNativeFieldFilter, DynamicFilterType, DynamicFilterTypeF} from '@finance.workspace/shared/model';
import {DynamicFilterValue, DynamicFilterValueF} from '@finance.workspace/shared/model';
import {requireNonNull} from '@finance.workspace/shared/util';

export interface DynamicFilterModel {
  id: string;
  fieldId: string;
  label: string;
  type: DynamicFilterType;
  value: DynamicFilterValue;
}

export const DynamicFilterModelF = {

  fromBoFieldFilter(dynamicFilter: BoFieldFilter): DynamicFilterModel {
    requireNonNull(dynamicFilter, 'dynamicFilter');
    const dynamicFilterType = DynamicFilterTypeF.fromFormFieldType(dynamicFilter.type);
    return {
      id: dynamicFilter.id,
      label: dynamicFilter.label,
      fieldId: dynamicFilter.fieldId,
      type: dynamicFilterType,
      value: DynamicFilterValueF.fromBoFormField(dynamicFilterType, dynamicFilter),
    };
  },

  fromNativeFieldFilter(nativeFilter: BoNativeFieldFilter): DynamicFilterModel {
    requireNonNull(nativeFilter);
    const dynamicFilterType = DynamicFilterTypeF.fromNativeFieldType(nativeFilter.type);
    return {
      id: nativeFilter.id,
      label: nativeFilter.type,
      fieldId: undefined,
      type: dynamicFilterType,
      value: DynamicFilterValueF.fromNativeFieldType(dynamicFilterType, nativeFilter),
    };
  },

};
