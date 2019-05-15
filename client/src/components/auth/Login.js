import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { loginUser, clearAuthErrors } from "../../actions/authActions";

import OAuthButtons from "../common/OAuthButtons";

function Login(props) {
  const { isAuthenticated, errors } = props.auth;

  if (isAuthenticated) {
    props.history.push("/");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
    props.loginUser(formData, props.history);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            aria-label="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            aria-label="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={onChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <OAuthButtons />
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearAuthErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser, clearAuthErrors }
)(withRouter(Login));
