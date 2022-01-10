import {BoiDialogType} from '@finance.workspace/shared/model';

export class ApiBoiCardContext {

  boId: string;
  boiId: string;
  draftId?: string;
  fieldId?: string;
  onTabSaveClick?: () => void;
  dialogType?: BoiDialogType;

  static of(data: ApiBoiCardContext): ApiBoiCardContext {
    return Object.assign(new ApiBoiCardContext(), data);
  }

}
