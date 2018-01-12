import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Logout from "./Logout/Logout";
import Auth from "./Auth/Auth";
import About from "./About/About";
import store from "./store";
import {
  loginUser,
  fetchQuote,
  fetchSecretQuote,
  logoutUser
} from "./actions/users";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="nav">
          <h1>JustForFriends</h1>
          <div className="nav-items">
            {store.getState().auth.authenticated && (
              <div>
                <Link to="/about" className="nav-item">
                  About
                </Link>
                <Link to="/home" className="nav-item">
                  Home
                </Link>
                <Link to="/profile" className="nav-item">
                  Profile
                </Link>
                <Link to="/logout" className="nav-item">
                  Logout
                </Link>
              </div>
            )}
            {!store.getState().auth.authenticated && (
              <div>
                <Link to="/about" className="nav-item">
                  About
                </Link>
                <Link to="/home" className="nav-item">
                  Home
                </Link>
                <Link to="/login" className="nav-item">
                  Login
                </Link>
                <Link to="/register" className="nav-item">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
        <Switch className="body">
          <Route
            exact
            path="/home"
            component={
              // Auth(
              Home
              // )
            }
          />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/logout" component={Logout} />
          <Route path="/*" render={() => <Redirect to="/home" />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
