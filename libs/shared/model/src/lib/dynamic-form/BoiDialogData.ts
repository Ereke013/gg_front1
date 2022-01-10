import {BoiDialogType} from '@finance.workspace/shared/model';
import {BoiDialogPosition} from './BoiDialogPosition';

export interface BoiDialogData {
  type: BoiDialogType;
  boId: string;
  boInstanceId: string;
  draftId?: string;
  messageId?: string;
  defaultFieldValueMap?: Map<string, string>;
  dialogPosition?: BoiDialogPosition;
  preTouch?: boolean;
}
