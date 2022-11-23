import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { ApiRoutes } from "./routes";
import { THEME } from "./constants/css";
import { useAxiosInterceptors } from "./helpers/axios";

function App() {
  useAxiosInterceptors();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={`${THEME?.bgPrimary}`}>
          <ApiRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
