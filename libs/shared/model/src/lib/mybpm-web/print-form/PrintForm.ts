import {PrintFormFileInfo} from './PrintFormFileInfo';
import {PrintFormFileType} from './PrintFormFileType';

export interface PrintForm {
  printFormId: string;
  name: string;
  fileType: PrintFormFileType;
  fileId: string;
  fileInfo: PrintFormFileInfo;
}
