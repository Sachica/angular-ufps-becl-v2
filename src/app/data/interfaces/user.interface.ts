import { IRol } from './rol.interface';

export interface IFacultad {
  id: number;
  name: string;
}

export interface IProgram {
  id: number;
  name: string;
  facultad: IFacultad;
}

export interface ISimpleUser {
  id: number;
  first_name: string;
  last_name: string;
  picture: string;
}

export interface IUser extends ISimpleUser{
  username: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  program: IProgram;
  roles: IRol[];
}

export interface ISimpleStaff extends ISimpleUser{
  
}