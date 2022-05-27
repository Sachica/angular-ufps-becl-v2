import { IPermission } from "./permission.interface";

export interface IGroup {
  id: number;
  name: string;
  permissions: IPermission[];
}
