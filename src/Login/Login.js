import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  loginUser,
  fetchQuote,
  fetchSecretQuote,
  logoutUser
} from "../actions/users";

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    const { errorMessage } = this.props;
    return (
      <div>
        <input type="text" ref="username" placeholder="Username" />
        <input type="password" ref="password" placeholder="Password" />
        <button onClick={event => this.handleClick(event)}>Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    );
  }
  handleClick(e) {
    let username = this.refs.username;
    let password = this.refs.password;
    const creds = {
      username: username.value.trim(),
      password: password.value.trim()
    };
    this.props.onLoginClick(creds);
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default Login;
