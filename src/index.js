import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import cookie from "js-cookie";

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

//
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import { Router, browserHistory } from 'react-router';
// import reduxThunk from 'redux-thunk';
// import routes from './routes';
// import reducers from './reducers/index';

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
