import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { IAuthState } from "../../interfaces/api";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    user: {},
    isLoggedIn: false,
    userSignUp: null,
    isNotVerified: false
  },
  reducers: {
    login: (s, action) => {
      const data = action.payload?.data;
      console.log(data)
      if (!data.isVerified) {
        s.user = data;
        s.isNotVerified = true;
      } else {
        localStorage.setItem("user", JSON.stringify(data || {}));
        localStorage.setItem("token", data?.token);
        s.token = action.payload.data?.token;
        s.user = data;
        s.isLoggedIn = true;
      }
    },
    verify: (s, action) => {
      s.isNotVerified = false;
    },
    signUp: (s, action) => {
      console.log(action);
      s.userSignUp = action.payload;

    },
    logout: (s) => {
      localStorage.clear();
      s.token = "";
      s.user = {};
      s.isLoggedIn = false;
    },
    setSessionUser: (s) => {
      const data = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      s.token = token || "";
      s.user = data ? JSON.parse(data) : {};
      s.isLoggedIn = Boolean(token && data);
    },
    forgotPassword: (s, action) => {
    },
    resetPassword: (s, action) => {
    },
  },
});

export const { login, verify, signUp, setSessionUser, logout } = authSlice.actions;
export default authSlice.reducer;
