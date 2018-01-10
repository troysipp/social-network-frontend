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

// export function invalidateStocks() {
//   return {
//     type: INVALIDATE_STOCKS
//   };
// }

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

// export function deleteStock(symbol) {
//   // Thunk middleware knows how to handle functions.
//   // It passes the dispatch method as an argument to the function,
//   // thus making it able to dispatch actions itself.
//
//   return function (dispatch) {
//     // First dispatch: the app state is updated to inform
//     // that the API call is starting.
//
//     dispatch(requestStocks())
//
//     // The function called by the thunk middleware can return a value,
//     // that is passed on as the return value of the dispatch method.
//
//     // In this case, we return a promise to wait for.
//     // This is not required by thunk middleware, but it is convenient for us.
//
//     return fetch(`http://localhost:3001/api/stocks`)
//       .then(
//         response => response.json(),
//         // Do not use catch, because that will also catch
//         // any errors in the dispatch and resulting render,
//         // causing a loop of 'Unexpected batch number' errors.
//         // https://github.com/facebook/react/issues/6895
//         error => console.log('An error occurred.', error)
//       )
//       .then(json =>
//         // We can dispatch many times!
//         // Here, we update the app state with the results of the API call.
//
//         dispatch(receiveStocks(json))
//       )
//   }
// }
