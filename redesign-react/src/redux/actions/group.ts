import { IUser } from "../../interfaces/user";
import { API, GET, POST, AUTH_URL, GROUP_URL } from "../api-constant";
import { login } from "../slices/auth";
import { getAllUsers, getUserGroups } from "../slices/group";

export const getGroupList = () => ({
  type: API,
  payload: {
    url: `${GROUP_URL}/user-groups`,
    method: GET,
    success: getUserGroups,
  },
});

export const getUserList = () => ({
  type: API,
  payload: {
    url: `${GROUP_URL}/users`,
    method: GET,
    success: getAllUsers,
  },
});

export const addGroup = (data: any) => ({
  type: API,
  payload: {
    url: `${GROUP_URL}`,
    method: POST,
    data,
    success: getAllUsers,
  },
});

export const dummyLogin = (data: any) => login(data);
