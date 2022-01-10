import {SignatureType} from '@finance.workspace/shared/model';

export interface SignatureRecord {
  id: string;
  fio: string;
  signedAt: Date;
  type: SignatureType;
}
