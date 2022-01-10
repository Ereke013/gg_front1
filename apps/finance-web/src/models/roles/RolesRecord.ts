import { UserRole } from '../client/UserRole';
import { Dict } from '@finance-web/models/dict/Dict';

export interface RolesRecord {
  roles: UserRole[],
  clientId: number,
  fullName: string,
  phoneNumber: string,
  foName: Dict,
}
