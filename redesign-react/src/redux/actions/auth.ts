import { IResetPassword } from "../../interfaces/api";
import { IUser } from "../../interfaces/user";
import { API, USER_URL, POST, AUTH_URL } from "../api-constant";
import { login, verify, signUp } from "../slices/auth";

export const doLogin = (data: IUser) => ({
  type: API,
  payload: {
    url: `${AUTH_URL}/login`,
    data,
    method: POST,
    success: login,
  },
});

export const forgotPassword = (data: IUser) => ({
  type: API,
  payload: {
    url: `${AUTH_URL}/forgot-password`,
    data,
    method: POST,
  },
});

export const resetPassword = (data: IResetPassword) => ({
  type: API,
  payload: {
    url: `${AUTH_URL}/reset-password`,
    data,
    method: POST,
  },
});

export const verifyAccount = (data: Partial<IResetPassword>) => ({
  type: API,
  payload: {
    url: `${AUTH_URL}/verify`,
    data,
    method: POST,
    success: verify
  },
});

export const doSignUp = (data: IUser) => ({
  type: API,
  payload: {
    url: `${AUTH_URL}/sign-up`,
    data,
    method: POST,
    success: signUp,
  },
});

export const dummyLogin = (data: any) => login(data);
