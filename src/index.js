import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import cookie from "js-cookie";

import { AUTH_USER } from "./constants/users";
import store from "./store";
import "./index.css";
import App from "./App";

console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

const token = cookie.set("token");
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
