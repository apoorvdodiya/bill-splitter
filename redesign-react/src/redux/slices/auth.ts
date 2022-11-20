import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    user: {},
    isLoggedIn: false,
  },
  reducers: {
    login: (s, action) => {
      localStorage.setItem("user", JSON.stringify(action?.payload?.data || {}));
      localStorage.setItem("token", action.payload?.data?.token);
      s.token = action.payload.data?.token;
      s.user = action.payload.data;
      s.isLoggedIn = true;
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
  },
});

export const { login, setSessionUser, logout } = authSlice.actions;
export default authSlice.reducer;
