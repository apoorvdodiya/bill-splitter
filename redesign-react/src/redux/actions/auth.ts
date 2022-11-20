import { IUser } from "../../interfaces/user";
import { API, USER_URL, POST } from "../api-constant";
import { login } from "../slices/auth";

export const doLogin = (data: IUser) => ({
  type: API,
  payload: {
    url: `${USER_URL}/login`,
    data,
    method: POST,
    success: login,
  },
});

export const dummyLogin = (data: any) => login(data);
