import { IGroup, IPermission, IUser } from "@data/interfaces";

export class User implements IUser {
  constructor(
    public id: number,
    public is_superuser: boolean,
    public is_active: boolean,
    public groups: IGroup[],
    public user_permissions: IPermission[],
    ) { }
}
