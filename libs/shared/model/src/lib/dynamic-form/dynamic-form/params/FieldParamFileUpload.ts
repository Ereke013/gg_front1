export interface FieldParamFileUpload {
  viewType: FileUploadViewType;
}

export enum FileUploadViewType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
  TILE = 'TILE',
}


export function defaultFieldParamFileUpload(): FieldParamFileUpload {
  return {
    viewType: FileUploadViewType.SINGLE,
  };
}
