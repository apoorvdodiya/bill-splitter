import { IUser } from "../../interfaces/user";
import { API, GET, POST, AUTH_URL, GROUP_URL, USER_URL } from "../api-constant";
import { login } from "../slices/auth";
import { getUserGroups } from "../slices/group";

export const getUserList = () => ({
  type: API,
  payload: {
    url: `${USER_URL}`,
    method: GET,
    success: getUserGroups,
  },
});

export const dummyLogin = (data: any) => login(data);
