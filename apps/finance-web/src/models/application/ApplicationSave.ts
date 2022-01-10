import {PledgeApplication} from "./PledgeApplication";
import {DocumentApplication} from "./DocumentApplication";

export interface ApplicationSave {
  pledgeColumnList: PledgeApplication[];
  documentApplicationList: DocumentApplication[];
}
