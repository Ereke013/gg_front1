export interface FieldParamTabGroup {
  showAsStepper: boolean;
}

export function defaultFieldParamTabGroup(): FieldParamTabGroup {
  return {
    showAsStepper: false,
  };
}
