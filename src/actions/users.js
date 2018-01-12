import axios from "axios";
import { browserHistory } from "react-router";
import cookie from "js-cookie";

import store from "../store";
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  PROTECTED_TEST
} from "../constants/users";

const apiUrl = "http://localhost:3001/";
// "https://protected-basin-65203.herokuapp.com/";

export function errorHandler(dispatch, error, type) {
  let errorMessage = "";
  if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if (error.status === 401) {
    dispatch({
      type: type,
      payload: "That doesn't quite cut it. Try again."
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}

export function loginUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${apiUrl}api/login`, {
        email: store.getState().formReducer.login.values.email,
        password: store.getState().formReducer.login.values.password
      })
      .then(response => {
        // console.log(response);
        cookie.set("token", response.data.token, { path: "/" });
        console.log(response.data);
        dispatch({ type: AUTH_USER });
        window.location.href = "/";
        return {
          type: AUTH_USER,
          payload: "here it is"
        };
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function registerUser({ email, username, password }) {
  return function(dispatch) {
    axios
      .post(`${apiUrl}api/signup`, {
        email: store.getState().formReducer.register.values.email,
        username: store.getState().formReducer.register.values.username,
        password: store.getState().formReducer.register.values.password
      })
      .then(response => {
        cookie.set("token", response.data.token, { path: "/" });
        dispatch({ type: AUTH_USER });
        window.location.href = "/";
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function logoutUser() {
  return function(dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove("token", { path: "/" });

    window.location.href = "/login";
  };
}

export function protectedTest() {
  return function(dispatch) {
    axios
      .get(`${apiUrl}protected`, {
        headers: { Authorization: cookie.load("token") }
      })
      .then(response => {
        dispatch({
          type: PROTECTED_TEST,
          payload: response.data.content
        });
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_USER);
      });
  };
}
