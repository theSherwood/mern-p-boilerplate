import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

function Header(props) {
  const { auth } = props;

  const onLogoutClick = e => {
    props.logoutUser();
  };
  return (
    <header style={{ background: "steelblue" }}>
      <div>
        <h4 style={{ display: "inline-block" }}>Header</h4>
      </div>
    </header>
  );
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
