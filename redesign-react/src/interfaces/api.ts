import { IGroup } from "./group";
import { IUser } from "./user";
export interface IRootState {
  api: IAPIState;
  auth: IAuthState;
  group: IGroupState;
  user: IUserState;
}

export interface IAPIState {
  isLoading: boolean;
  response: any; // TODO Create interface as per your project
  error: any; // TODO Create interface as per your project
}

export interface IAuthState {
  isLoggedIn: boolean;
  userSignUp: any;
  user: IUser;
  token: string;
}

export interface IGroupState {
  userGroups: IGroup[];
  userList: IUser[];
  groupAdded: any
}

export interface IUserState {
  allUsers: IUser[];
}
