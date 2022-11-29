import { IGroup } from "./group";
import { ISplit } from "./split";
import { IUser } from "./user";
export interface IRootState {
  api: IAPIState;
  auth: IAuthState;
  group: IGroupState;
  user: IUserState;
  split: ISplitState;
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
  groupAdded: any;
}

export interface IUserState {
  allUsers: IUser[];
}

export interface ISplitState {
  userGroups: IGroup[];
  userList: IUser[];
  addedSplit: any;
  userSplits: ISplit[];
}
