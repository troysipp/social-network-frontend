import { combineReducers } from "redux";

import {
  CREATE_EVENT,
  DELETE_EVENT,
  REQUEST_EVENTS,
  RECEIVE_EVENTS
} from "../constants/events";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
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
    isFetching: false,
    isAuthenticated: localStorage.getItem("id_token") ? true : false
  },
  action
) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ""
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  eventsReducer,
  usersReducer
});

export default rootReducer;
