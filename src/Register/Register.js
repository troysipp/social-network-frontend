import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { registerUser } from "../actions/users";

const form = reduxForm({
  form: "register",
  validate
});

const renderField = field => (
  <div>
    <input className="form-control" {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

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
        <div className="form">
          <div className="form-item">
            <label>Email</label>
            <Field name="email" component={renderField} type="text" />
          </div>
          <div className="form-item">
            <label>Username</label>
            <Field name="username" component={renderField} type="text" />
          </div>
          <div className="form-item">
            <label>Password</label>
            <Field name="password" component={renderField} type="text" />
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
