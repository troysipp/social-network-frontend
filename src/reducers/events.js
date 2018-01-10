import { combineReducers } from "redux";

import {
  CREATE_EVENT,
  DELETE_EVENT,
  REQUEST_EVENTS,
  RECEIVE_EVENTS
} from "../constants/events";

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

const rootReducer = combineReducers({
  eventsReducer
});

export default rootReducer;
