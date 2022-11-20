import { configureStore } from "@reduxjs/toolkit";
import { apiMiddleware } from "../middleware/api";
import thunk from "redux-thunk";
import apiReducer from "./slices/api";
import authReducer from "./slices/auth";

export default configureStore({
  reducer: {
    api: apiReducer,
    auth: authReducer,
  },
  middleware: [thunk, apiMiddleware],
});
