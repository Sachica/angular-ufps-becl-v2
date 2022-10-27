import { IRol } from './rol.interface';
import { IProgram } from './program.interface';

export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  picture: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  program: IProgram;
  roles: IRol[];
}
