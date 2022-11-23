import { configureStore } from "@reduxjs/toolkit";
import { apiMiddleware } from "../middleware/api";
import thunk from "redux-thunk";
import apiReducer from "./slices/api";
import authReducer from "./slices/auth";
import groupReducer from "./slices/group";

export default configureStore({
  reducer: {
    api: apiReducer,
    auth: authReducer,
    group: groupReducer,
  },
  middleware: [thunk, apiMiddleware],
});
