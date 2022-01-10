import {BoiDialogType} from '../../../../../libs/shared/model/src';

export class DffData {

  ownerBoId: string | undefined;
  ownerBoiId: string | undefined;
  draftId: string | undefined;
  dialogType: BoiDialogType | undefined;

  static of(data: DffData): DffData {
    return Object.assign(new DffData(), data);
  }

}
