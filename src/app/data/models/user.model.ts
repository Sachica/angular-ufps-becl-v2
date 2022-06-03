import { IGroup, IPermission, IProgram, IUser } from "@data/interfaces";

export class User implements IUser {
  constructor(
    public id: number,
    public username: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public picture: string,
    public is_active: boolean,
    public is_superuser: boolean,
    public program: IProgram,
    public groups: IGroup[],
    public user_permissions: IPermission[]
  ) {}
}
