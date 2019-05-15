import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser, clearAuthErrors } from "../../actions/authActions";

import OAuthButtons from "../common/OAuthButtons";

function Register(props) {
  const { isAuthenticated, errors } = props.auth;

  if (isAuthenticated) {
    props.history.push("/challenges");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    handle: ""
  });

  useEffect(() => {
    return () => {
      props.clearAuthErrors();
    };
  }, []);

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    props.registerUser(formData, props.history);
  };

  const { email, password, password2, handle } = formData;
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="handle">Display Name/Handle</label>
          <input
            aria-label="handle"
            name="handle"
            type="text"
            value={handle}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            aria-label="email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            aria-label="password"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm Password</label>
          <input
            aria-label="confirm password"
            name="password2"
            type="password"
            value={password2}
            onChange={onChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <OAuthButtons />
    </div>
  );
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  clearAuthErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser, clearAuthErrors }
)(withRouter(Register));
