import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "reactstrap";
import { connect } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { setAlert } from "./../../actions/alert";
import { register } from "./../../actions/auth";
import PropTypes from "prop-types";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      pwd: "",
      confirmPwd: "",
    };
  }

  submitForm = async (e) => {
    e.preventDefault();
    const { pwd, confirmPwd, name, email } = this.state;

    if (pwd !== confirmPwd) {
      this.props.setAlert("Passwords do not match", "danger");
      console.log("Alert!!");
    } else {
      const newuser = { name, email, password: pwd };
      console.log(newuser);
      this.props.register(newuser);
    }
  };

  render() {
    const { name, email, pwd, confirmPwd } = this.state;
    const { submitForm } = this;

    if (this.props.isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <section className="container register">
        <h1 className="medium text-center">Sign Up</h1>
        <p className="lead text-center">
          <FontAwesomeIcon icon={["fas", "user"]} />
          <span className="ml-3" style={{ marginLeft: "0.5rem" }}>
            {" "}
            Create Your Account
          </span>
        </p>
        <form className="form w-50 mx-auto" onSubmit={(e) => submitForm(e)}>
          <div className="form-group my-4">
            <Input
              type="text"
              name="Name"
              required
              placeholder="Name"
              style={{ fontSize: "1rem" }}
              value={name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>
          <div className="form-group my-4">
            <Input
              type="email"
              name="email"
              required
              placeholder="Email address"
              style={{ fontSize: "1rem" }}
              value={email}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
            <small className="form-text ">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group my-4">
            <Input
              type="password"
              name="password"
              required
              placeholder="Password"
              minLength="6"
              value={pwd}
              style={{ fontSize: "1rem" }}
              onChange={(e) => {
                this.setState({ pwd: e.target.value });
              }}
            />
          </div>
          <div className="form-group my-4">
            <Input
              type="password"
              name="password2"
              required
              placeholder="Confirm Password"
              minLength="6"
              style={{ fontSize: "1rem" }}
              value={confirmPwd}
              onChange={(e) => {
                this.setState({ confirmPwd: e.target.value });
              }}
            />
          </div>
          <input
            type="submit"
            className="btn btn-info"
            value="Register"
            style={{ color: "white" }}
          />
          <p className="my-3">
            Already have an account? <NavLink to="/login">Sign In</NavLink>
          </p>
        </form>
      </section>
    );
  }
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
