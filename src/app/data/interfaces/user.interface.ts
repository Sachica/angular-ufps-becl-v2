import { IGroup } from './group.interface';
import { IPermission } from './permission.interface';
import { IProgram } from './program.interface';

export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  picture: string;
  is_active: boolean;
  is_superuser: boolean;
  program: IProgram;
  groups: IGroup[];
  user_permissions: IPermission[];
}
