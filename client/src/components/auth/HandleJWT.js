import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleJWT, clearAuthErrors } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";

const HandleJWT = props => {
  props.handleJWT(props.match.params.token, props.history);
  if (Object.keys(props.auth.errors).length > 0) {
    props.clearAuthErrors();
    props.history.push("/page-not-found");
  } else if (props.auth.isAuthenticated) {
    props.history.push("/");
  }
  return <Spinner />;
};

HandleJWT.propTypes = {
  handleJWT: PropTypes.func.isRequired,
  clearAuthErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { handleJWT, clearAuthErrors }
)(withRouter(HandleJWT));
