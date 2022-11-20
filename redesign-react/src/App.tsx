import React from 'react';
import './App.scss';
import { Provider } from "react-redux";
import store from './redux/store';
import { BrowserRouter } from "react-router-dom";
import { ApiRoutes } from './routes'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ApiRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
