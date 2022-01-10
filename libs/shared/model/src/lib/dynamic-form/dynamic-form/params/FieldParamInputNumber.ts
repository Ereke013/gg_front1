export interface FieldParamInputNumber {
  enableSequence: boolean;
}

export function defaultFieldParamInputNumber(): FieldParamInputNumber {
  return {
    enableSequence: false,
  };
}
