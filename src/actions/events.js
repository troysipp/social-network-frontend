import fetch from "cross-fetch";
import "babel-polyfill";

import {
  CREATE_EVENT,
  REQUEST_EVENTS,
  RECEIVE_EVENTS,
  DELETE_EVENT
} from "../constants/events";

export function createEvent(organizer, location, description) {
  return {
    type: CREATE_EVENT,
    payload: {
      organizer,
      location,
      description
    }
  };
}

export const deleteEvent = id => ({
  type: DELETE_EVENT,
  payload: id
});

function requestEvents() {
  return {
    type: REQUEST_EVENTS
  };
}

function receiveEvents(json) {
  return {
    type: RECEIVE_EVENTS,
    events: json.events,
    receivedAt: Date.now()
  };
}

function shouldFetchEvents(state) {
  if (!state.events) {
    return true;
  } else if (state.isFetching) {
    return false;
  } else {
    return;
  }
}

export function fetchEvents() {
  return function(dispatch) {
    dispatch(requestEvents());
    return fetch("http://localhost:3001/api/events")
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      )
      .then(json => dispatch(receiveEvents(json)));
  };
}

export function fetchEventsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchEvents(getState())) {
      return dispatch(fetchEvents());
    } else {
      return Promise.resolve();
    }
  };
}
