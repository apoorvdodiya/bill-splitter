import { IUser } from "./user";

export interface IGroup {
  id?: number;
  name?: string;
  members?: IUser[];
  collapsed?: boolean;
}
