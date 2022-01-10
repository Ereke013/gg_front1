import {FileMetaInfo} from '@finance.workspace/shared/model';

export interface TabAttachmentRecord {
  fieldId: string;
  label: string;
  docList: FileMetaInfo[];
}
