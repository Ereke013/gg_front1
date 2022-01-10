import {BoFieldValue} from '@finance.workspace/shared/model';

export interface BoiTableRecord {
  instanceId: string;
  values: BoFieldValue[];
  checked: boolean;
}
