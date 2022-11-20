import { IUser } from "../../interfaces/user";
import { API, USER_URL, POST, AUTH_URL } from "../api-constant";
import { login } from "../slices/auth";

export const doLogin = (data: IUser) => ({
  type: API,
  payload: {
    url: `${AUTH_URL}/login`,
    data,
    method: POST,
    success: login,
  },
});

export const dummyLogin = (data: any) => login(data);
