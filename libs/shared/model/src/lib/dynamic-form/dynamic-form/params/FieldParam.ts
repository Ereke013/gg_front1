import {defaultFieldParamTabGroup} from './FieldParamTabGroup';
import {BoFieldType, defaultFieldParamFileUpload} from '@finance.workspace/shared/model';
import {defaultFieldParamInputNumber} from './FieldParamInputNumber';

export function defaultFieldParam(type: BoFieldType) {
  if (type === BoFieldType.FILE_UPLOAD) {
    return defaultFieldParamFileUpload();
  } else if (type === BoFieldType.TAB_GROUP) {
    return defaultFieldParamTabGroup();
  } else if (type === BoFieldType.INPUT_NUMBER) {
    return defaultFieldParamInputNumber();
  }

  return undefined;
}
