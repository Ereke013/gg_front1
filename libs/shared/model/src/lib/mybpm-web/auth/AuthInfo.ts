import {Can} from './Can';

export interface AuthInfo {
  fio: string;
  email: string;
  personId: string;
  avatarFileId: string;
  functionCodes: Can[];
}
