import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export default function(ContainerComponent) {
  class Auth extends Component {
    static contectTypes = {
      router: PropTypes.object
    };
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push("/login");
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push("/login");
      }
    }
    render() {
      return <ContainerComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Auth);
}

// UNCLEAR WHAT THIS DOES
