import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { ToastContainer } from "react-toastify";
import "assets/scss/material-kit-react.scss?v=1.9.0";
import "./components/Translations/i18n";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "store";

render(
  <Provider store={store}>
    <App />
    <ToastContainer autoClose={3000} />
  </Provider>,
  document.querySelector("#root")
);
