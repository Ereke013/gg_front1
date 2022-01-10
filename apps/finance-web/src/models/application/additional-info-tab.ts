import { CreditHistory } from '../CreditHistory';
import {ApplicationDocumentModel} from "@finance-web/models/application/ApplicationDocumentModel";

export interface AdditionalInfoTab {
  creditHistory: CreditHistory,
  additionalValue: string,
  documentIds: ApplicationDocumentModel[]
}
