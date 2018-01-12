import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Nav from "./Nav/Nav";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Logout from "./Logout/Logout";
import Auth from "./Auth/Auth";
import store from "./store";
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
    // const {
    //   dispatch,
    //   quote,
    //   isAuthenticated,
    //   errorMessage,
    //   isSecretQuote
    // } = this.props;
    // console.log(this.props);
    return (
      <div className="App">
        <div className="nav">
          <h1>Title</h1>
          <div className="nav-items">
            <Link to="/home" className="nav-item">
              Home
            </Link>
            {store.getState().auth.authenticated && (
              <div>
                <Link to="/profile" className="nav-item">
                  Profile
                </Link>
                <Link to="/logout" component={Logout} />
              </div>
            )}
            {!store.getState().auth.authenticated && (
              <div>
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
          <Route exact path="/home" component={Auth(Home)} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/*" render={() => <Redirect to="/home" />} />
        </Switch>
      </div>
    );
  }
}

// {/* <div className="site-entry"> */}
// {/* <Login
//       errorMessage={errorMessage}
//       onLoginClick={creds => this.props.dispatch(loginUser(creds))}
//     />
//     <Link to="/register" className="nav-item">
//       Register
//     </Link>
//   </div> */}
// {/* )}
// {isAuthenticated && ( */}
// {/* // <Link */}
// {/* //   to="/logout"
//   //   className="nav-item"
//   //   onLogoutClick={() => dispatch(logoutUser())}
//   // >
//   //   Logout
//   // </Link>
//   <Logout onLogoutClick={() => dispatch(logoutUser())} /> */}
// {/* )} */}

// App.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool.isRequired,
//   errorMessage: PropTypes.string
// };
// //
// function mapStateToProps(state) {
//   const { auth } = state;
//   // const { event, authenticated } = quotes;
//   const { isAuthenticated, errorMessage } = auth;
//
//   return {
//     isAuthenticated,
//     errorMessage
//   };
// }

export default // connect(mapStateToProps)(
withRouter(App);
// );
