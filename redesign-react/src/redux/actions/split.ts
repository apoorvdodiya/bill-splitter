import {
  API,
  GET,
  POST,
  AUTH_URL,
  GROUP_URL,
  SPLIT_URL,
  PATCH,
} from "../api-constant";
import { login } from "../slices/auth";
import { getAllUsers, getUserGroups, getUserSplits, splitCreated } from "../slices/split";

export const getGroupList = () => ({
  type: API,
  payload: {
    url: `${GROUP_URL}/user-groups`,
    method: GET,
    success: getUserGroups,
  },
});

export const getSplitList = (type: string) => ({
  type: API,
  payload: {
    url: `${SPLIT_URL}/my-split/${type}`,
    method: GET,
    success: getUserSplits,
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

export const addSplit = (data: any) => ({
  type: API,
  payload: {
    url: `${SPLIT_URL}`,
    method: POST,
    data,
    success: splitCreated,
  },
});

export const settle = (splitterId: number, data: any, type: 'payee' | 'borrower') => ({
  type: API,
  payload: {
    url: `${SPLIT_URL}/settle/${type}/${splitterId}`,
    method: PATCH,
    data,
    success: splitCreated,
  },
});

export const dummyLogin = (data: any) => login(data);
