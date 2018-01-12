import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import {
  CREATE_EVENT,
  DELETE_EVENT,
  REQUEST_EVENTS,
  RECEIVE_EVENTS
} from "../constants/events";
import {
  // LOGIN_REQUEST,
  // LOGIN_SUCCESS,
  // LOGIN_FAILURE,
  // LOGOUT_SUCCESS
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  PROTECTED_TEST
} from "../constants/users";

function eventsReducer(
  state = {
    isFetching: false,
    events: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_EVENTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_EVENTS:
      console.log(action);
      return Object.assign({}, state, {
        isFetching: false,
        events: action.events,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function usersReducer(
  state = {
    error: "",
    message: "",
    content: "",
    authenticated: false
  },
  action
) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: "",
        message: "",
        authenticated: true
      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case PROTECTED_TEST:
      return {
        ...state,
        content: action.payload
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  eventsReducer,
  auth: usersReducer,
  formReducer
});

export default rootReducer;
