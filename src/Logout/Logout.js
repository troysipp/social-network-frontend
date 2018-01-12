import React from "react";
import { connect } from "react-redux";

import store from "../store";
import { logoutUser } from "../actions/users";

class Logout extends React.Component {
  logout() {
    console.log("logging out");
    this.props.logoutUser();
    this.props.history.push("/");
  }

  componentDidMount() {
    this.logout();
  }

  render() {
    return <div />;
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { logoutUser })(Logout);
