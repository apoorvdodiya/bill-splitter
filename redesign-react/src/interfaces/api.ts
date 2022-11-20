export interface IRootState {
  api: IAPIState;
  auth: IAuthState;
}

export interface IAPIState {
  isLoading: boolean;
  response: any; // TODO Create interface as per your project
  error: any; // TODO Create interface as per your project
}

export interface IAuthState {
  isLoggedIn: boolean;
}
