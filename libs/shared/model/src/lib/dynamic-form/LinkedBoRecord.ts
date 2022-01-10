export interface LinkedBoRecord {
  refBoName: string;
  fieldsForLink: LinkedBoFieldRecord[];
}

export interface LinkedBoFieldRecord {
  fieldId: string;
  label: string;
}
