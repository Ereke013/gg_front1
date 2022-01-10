export interface BoiSelectorRequest {
  businessObjectId: string;
  boInstanceIds: string[];
  fieldIds: string[];
  draftId?: string;

  ownerFieldId?: string;
  ownerBoId?: string;
  ownerBoInstanceId?: string;
}
