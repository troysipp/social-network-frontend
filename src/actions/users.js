import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from "../constants/users";
// import { SUCCESS, ERROR, CLEAR } from "../constants/alerts";
// import { success, error, clear } from "./alerts";
// import {userService} from "../_services"
// import {history} from "../_helpers"

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

export function loginUser(creds) {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `username=${creds.username}&password=${creds.password}`
  };
  return dispatch => {
    dispatch(requestLogin(creds));
    return fetch("http://localhost:3001/api/sessions/create", config) // do i want this?
      .then(response => response.json().then(user => ({ user, response })))
      .then(({ user, response }) => {
        if (!response.ok) {
          dispatch(loginError(user.message));
          return Promise.reject(user);
        } else {
          localStorage.setItem("id_token", user.id_token);
          localStorage.setItem("access_token", user.access_token);
          dispatch(receiveLogin(user));
        }
      })
      .catch(err => console.log(err));
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    dispatch(receiveLogout());
  };
}
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
