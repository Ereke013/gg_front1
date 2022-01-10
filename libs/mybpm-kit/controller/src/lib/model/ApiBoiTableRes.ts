import {BoFieldValue} from '@finance.workspace/shared/model';

export interface ApiBoiTableRes {

  boCode: string;
  heads: ApiBoiTableHead[];
  records: ApiBoiTableRecord[];
  hasNext: boolean;
  totalHits: number;

}

export interface ApiBoiTableRecord {

  instanceId: string;
  values: BoFieldValue[];

}

export interface ApiBoiTableHead {
  fieldId: string;
  code: string;
  name: string;
}
