import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Nav from "./Nav/Nav";
import logo from "./logo.svg";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";
import {
  loginUser,
  fetchQuote,
  fetchSecretQuote,
  logoutUser
} from "./actions/users";
import "./App.css";

class App extends Component {
  // retrieveEvents() {
  //   axios
  //     .get(`http://localhost:3001/api/events`)
  //     .then(res => {
  //       this.setState({
  //         events: res.data.events
  //       });
  //       console.log("dogs");
  //       console.log(this.state);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  //
  // componentDidMount() {
  //   console.log(this.state);
  //   this.retrieveEvents(console.log());
  // }
  render() {
    const {
      dispatch,
      quote,
      isAuthenticated,
      errorMessage,
      isSecretQuote
    } = this.props;
    console.log(this.props);
    return (
      <div className="App">
        <div className="nav">
          <h1>Title</h1>
          <div className="nav-items">
            <Link to="/home" className="nav-item">
              Home
            </Link>
            <Link to="/profile" className="nav-item">
              Profile
            </Link>
            {!isAuthenticated && (
              // <Link
              //   to="/login"
              //   className="nav-item"
              //   errorMessage={errorMessage}
              //   onLoginClick={creds => dispatch(loginUser(creds))}
              // >
              //   Login
              // </Link>
              <Login
                errorMessage={errorMessage}
                onLoginClick={creds => this.props.dispatch(loginUser(creds))}
              />
            )}
            {isAuthenticated && (
              // <Link
              //   to="/logout"
              //   className="nav-item"
              //   onLogoutClick={() => dispatch(logoutUser())}
              // >
              //   Logout
              // </Link>
              <Logout onLogoutClick={() => dispatch(logoutUser())} />
            )}
          </div>
        </div>
        <Switch className="body">
          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route path="/*" render={() => <Redirect to="/home" />} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};
//
function mapStateToProps(state) {
  const { auth } = state;
  // const { event, authenticated } = quotes;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage
  };
}

export default connect(mapStateToProps)(withRouter(App));
