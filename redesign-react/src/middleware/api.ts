import { IAction, INextFunction, IStore } from "../interfaces/common";
import { API } from "../redux/api-constant";
import axios from "axios";
import { Middleware } from "redux";
import { IRootState } from "../interfaces/api";
import { apiError, apiSuccess } from "../redux/slices/api";
export const apiMiddleware: Middleware<{}, IRootState> =
  (store) => (next) => (action) => {
    next(action);

    if (action.type === API) {
      const {
        method,
        url,
        data,
        params,
        success: onSuccess,
        error: onError,
      } = action.payload;

      return new Promise((resolve, reject) => {
        axios({
          url,
          method,
          data,
          params,
          baseURL: process.env.REACT_APP_BASE_URL || 'https://localhost:3300/',
        })
          .then((res) => {
            store.dispatch(apiSuccess(res));
            onSuccess && store.dispatch(onSuccess(res));
            resolve(res);
          })
          .catch((error) => {
            store.dispatch(apiError(error));
            onError && store.dispatch(onError(error));
            reject(error);
          });
      });
    }
  };
