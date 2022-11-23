import axios, { AxiosRequestConfig, AxiosStatic } from "axios";
import store from "../redux/store";

export const useAxiosInterceptors = () => {
  axios.interceptors.request.use((req: AxiosRequestConfig<any>) => {
    console.log(store.getState())
    if (!req.headers) req.headers = {};
    if (store?.getState()?.auth?.token)
      req.headers["Authorization"] = `Bearer ${store?.getState()?.auth?.token}`;
    return req;
  });
};
