import { IGroup } from './group.interface';
import { IPermission } from './permission.interface';

export interface IUser {
  id: number;
  is_superuser: boolean;
  is_active: boolean;
  groups: IGroup[];
  user_permissions: IPermission[];
}
