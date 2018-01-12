import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { registerUser } from "../actions/users";

const form = reduxForm({
  form: "register",
  validate
});

const formatField = value => value;

// const renderField = field => (
//   <div>
//     <input className="form-control" {...field.input} />
//     {field.touched && field.error && <div className="error">{field.error}</div>}
//   </div>
// );

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = "Enter an email, please";
  }
  if (!formProps.username) {
    errors.username = "Enter a username, please";
  }
  if (!formProps.password) {
    errors.password = "Enter a password, please";
  }
  return errors;
}

class Register extends Component {
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
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
        <h2>Welcome! We're glad you're joining us!</h2>
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
              name="username"
              placeholder="Username"
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
          <button type="submit">Register</button>
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

export default connect(mapStateToProps, { registerUser })(form(Register));
