import {BoFieldValue} from '@finance.workspace/shared/model';

export interface BoInstance {
  boInstanceId: string;
  fields: BoFieldValue[];
}
