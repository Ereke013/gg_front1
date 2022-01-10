import {PrintFormRecord} from '../print-form/PrintFormRecord';
import {FilledSignatureField} from './FilledSignatureField';

export interface FilledSignatureGroup {
  fields: FilledSignatureField[];
  printFormList: PrintFormRecord[];
}
