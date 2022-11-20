import { createSlice } from "@reduxjs/toolkit";
import { IAPIState } from "../../interfaces/api";

export const apiSlice = createSlice({
  name: "api",
  initialState: {
    isLoading: false,
    response: {},
    error: {},
  },
  reducers: {
    request: (s, payload) => {
      s.isLoading = true;
    },
    apiSuccess: (s, payload) => {
      s.isLoading = false;
      s.response = payload;
    },
    apiError: (s, payload) => {
      s.isLoading = false;
      s.error = payload;
    },
  },
});

export const { apiSuccess, apiError } = apiSlice.actions;
export default apiSlice.reducer;
