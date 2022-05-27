import { IUser } from "./user.interface";

export interface IAccessToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  user: IUser;
}

