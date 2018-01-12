import axios from "axios";
import { browserHistory } from "react-router";
import cookie from "js-cookie";
import store from "../store";

import {
  // LOGIN_REQUEST,
  // LOGIN_SUCCESS,
  // LOGIN_FAILURE,
  // LOGOUT_FAILURE,
  // LOGOUT_REQUEST,
  // LOGOUT_SUCCESS
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  PROTECTED_TEST
} from "../constants/users";
// import { SUCCESS, ERROR, CLEAR } from "../constants/alerts";
// import { success, error, clear } from "./alerts";
// import {userService} from "../_services"
// import {history} from "../_helpers"

const apiUrl = "http://localhost:3001/";

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
        console.log("bananas");
        console.log(response.config.data);
        cookie.set(("token", response.data.token), { path: "/" });
        dispatch({ type: AUTH_USER, payload: response.config.data });
        window.location.href = `/?${response.config.data}`;
        console.log(response);
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

// function requestLogin(creds) {
//   return {
//     type: LOGIN_REQUEST,
//     isFetching: true,
//     isAuthenticated: false,
//     creds
//   };
// }
//
// function receiveLogin(user) {
//   return {
//     type: LOGIN_SUCCESS,
//     isFetching: false,
//     isAuthenticated: true,
//     id_token: user.id_token
//   };
// }
//
// function loginError(message) {
//   return {
//     type: LOGIN_FAILURE,
//     isFetching: false,
//     isAuthenticated: false,
//     message
//   };
// }
//
// export function loginUser(creds) {
//   let config = {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: `username=${creds.username}&password=${creds.password}`
//   };
//   return dispatch => {
//     dispatch(requestLogin(creds));
//     return fetch("http://localhost:3001/api/sessions/create", config) // do i want this?
//       .then(response => response.json().then(user => ({ user, response })))
//       .then(({ user, response }) => {
//         if (!response.ok) {
//           dispatch(loginError(user.message));
//           return Promise.reject(user);
//         } else {
//           localStorage.setItem("id_token", user.id_token);
//           localStorage.setItem("access_token", user.access_token);
//           dispatch(receiveLogin(user));
//         }
//       })
//       .catch(err => console.log(err));
//   };
// }
//
// function requestLogout() {
//   return {
//     type: LOGOUT_REQUEST,
//     isFetching: true,
//     isAuthenticated: true
//   };
// }
//
// function receiveLogout() {
//   return {
//     type: LOGOUT_SUCCESS,
//     isFetching: false,
//     isAuthenticated: false
//   };
// }
//
// export function logoutUser() {
//   return dispatch => {
//     dispatch(requestLogout());
//     localStorage.removeItem("id_token");
//     localStorage.removeItem("access_token");
//     dispatch(receiveLogout());
//   };
// }
// export function createUser(email, username) {
//   return {
//     type: CREATE_USER,
//     payload: {
//       email,
//       username
//     }
//   };
// }
//
// export function login(username, password) {
//   return dispatch => {
//     dispatch(request({ username }));
//
//     userService.login(username, password).then(
//       user => {
//         dispatch(success(user));
//         history.push("/");
//       },
//       error => {
//         dispatch(failure(error));
//         dispatch(error(error));
//       }
//     );
//   };
//   function request(user) {
//     return { type: LOGIN_REQUEST, user };
//   }
//   function success(user) {
//     return { type: LOGIN_SUCCESS, error };
//   }
//   function failure(error) {
//     return { type: LOGIN_FAILURE, error };
//   }
// }
//
// function logout() {
//   userService.logout();
//   return { type: LOGOUT };
// }
//
// function register(user) {
//   return dispatch => {
//     dispatch(request(user));
//     userService.register(user).then(
//       user => {
//         dispatch(success());
//         history.push("/login");
//         dispatch(success("Registration successful"));
//       },
//       error => {
//         dispatch(failure(error));
//         dispatch(error(error));
//       }
//     );
//   };
//   function request(user) {
//     return { type: REGISTER_REQUEST, user };
//   }
//   function success(user) {
//     return { type: REGISTER_SUCCESS, user };
//   }
//   function failure(error) {
//     return { type: REGISTER_FAILURE, error };
//   }
// }
//
// function _delete(id) {
//   return dispatch => {
//     dispatch(request(id));
//     userService.delete(id).then(
//       user => {
//         dispatch(success(id));
//       },
//       error => {
//         dispatch(failure(id, error));
//       }
//     );
//   };
//   function request(id) {
//     return { type: DELETE_REQUEST, id };
//   }
//   function success(id) {
//     return { type: DELETE_SUCCESS, id };
//   }
//   function failure(id, error) {
//     return { type: DELETE_FAILURE, id, error };
//   }
// }
