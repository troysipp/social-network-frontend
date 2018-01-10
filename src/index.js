import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

// import thunkMiddleware from "redux-thunk";
// import { createLogger } from "redux-logger";
// import { createStore, applyMiddleware } from "redux";

// import { fetchEvents } from "./actions/events";
// import rootReducer from "./reducers/events";
//
// const loggerMiddleware = createLogger()
//
// const store = createStore(
//   rootReducer,
//   applyMiddleware(
//     thunkMiddleware, // lets us dispatch() functions
//     loggerMiddleware // neat middleware that logs actions
//   )
// )
//
// store.dispatch(selectSubreddit('reactjs'))
// store
//   .dispatch(fetchPosts('reactjs'))
//   .then(() => console.log(store.getState()))

import store from "./store";
import "./index.css";
import App from "./App";

console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
