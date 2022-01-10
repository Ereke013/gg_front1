import {PrintFormRecord} from '../print-form/PrintFormRecord';
import {SignatureBoField} from './SignatureBoField';

export interface SignatureSettings {
  fields: SignatureBoField[];
  pfRecords: PrintFormRecord[];
}
