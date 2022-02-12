import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
   
    <ul>
      <li>
        <NavLink to="/dashboard" style={{ textDecoration: 'none' }} class="tab-profile active">
          <FontAwesomeIcon icon={["fas", "user"]} />
          {"    "}
          <span className="hide-sm">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/profiles" style={{ textDecoration: 'none' }} >
        <FontAwesomeIcon icon={["fas", "users"]} />{' '}
          Developers</NavLink>
      </li>
      <li>
        <NavLink to="/posts" style={{ textDecoration: 'none' }} >
        <FontAwesomeIcon icon={["fas", "folder"]} />{' '}
          Posts</NavLink>
      </li>
      
      <li>
        <a onClick={logout} href="#!" style={{ textDecoration: 'none' }}>
          {/* <i className="fas fa-sign-out-alt"></i> */}
          <FontAwesomeIcon icon={['fas', 'lock']}/>
          {" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
      
    </ul>
     
  );

  const guestLinks = (
    <ul>
      {/* <li>
        <NavLink to="/profiles" style={{ textDecoration: 'none' }}>Developers</NavLink >
      </li> */}
      <li>
        <NavLink to="/register" style={{ textDecoration: 'none' }} >
        <FontAwesomeIcon icon={['fas', 'user']}/>{' '}
          Register</NavLink>
      </li>
      <li>
        <NavLink to="/login" style={{ textDecoration: 'none' }} >{' '}
        <FontAwesomeIcon icon={['fas', 'unlock']}/>{' '}
          Login</NavLink>
      </li>
      
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <FontAwesomeIcon icon={["fas", "code"]} /> DevConnector
        </NavLink>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
