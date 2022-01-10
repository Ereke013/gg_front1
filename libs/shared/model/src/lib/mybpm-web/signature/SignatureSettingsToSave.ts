export interface SignatureSettingsToSave {
  boId: string;
  signatureId: string;

  addPfRecordIds: string[];
  delPfRecordIds: string[];

  addFieldIds: string[];
  delFieldIds: string[];
}
