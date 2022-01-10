import {PersonInvitationComplete} from './PersonInvitationComplete';

export interface AdminInvitationComplete extends PersonInvitationComplete {
  surname: string;
  name: string;
}
