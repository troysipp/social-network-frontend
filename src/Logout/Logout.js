import React, { Component } from "react";
import PropTypes from "prop-types";

class Logout extends Component {
  render() {
    const { onLogoutClick } = this.props;

    return <button onClick={() => onLogoutClick()}>Logout</button>;
  }
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
};

export default Logout;
