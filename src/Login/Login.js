import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router";

import { loginUser } from "../actions/users";

const form = reduxForm({
  form: "login"
});

// const renderField = field => {
//   return (
//     <div>
//       <input className="form-control" {...field.input} />
//       {field.touched &&
//         field.error && <div className="error">{field.error}</div>}
//     </div>
//   );
// };

const formatField = value => value;

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>;
    }
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
        <h2>Welcome back!</h2>
        <div className="form">
          <div className="form-item">
            <Field
              name="email"
              placeholder="Email"
              component="input"
              type="text"
              format={formatField}
            />
          </div>
          <div className="form-item">
            <Field
              name="password"
              placeholder="Password"
              component="input"
              type="text"
              format={formatField}
            />
          </div>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));
