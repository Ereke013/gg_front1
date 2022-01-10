export interface BoAutocompleteOptionsRequest {
  businessObjectId: string;
  fieldId: string;
  startWith: string;

  ownerFieldId: string;
  ownerBoId: string;
  ownerBoInstanceId: string;
}
