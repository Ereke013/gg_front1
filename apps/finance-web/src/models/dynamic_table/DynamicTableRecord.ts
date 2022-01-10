import {DynamicTableFieldValue} from "./DynamicTableFieldValue";

export interface DynamicTableRecord {
  instanceId: string;
  values: DynamicTableFieldValue[];
  checked: boolean;
}
