import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    error: "",
    success: false,
  });

  const { name, email, password, confirm_password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, confirm_password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          confirm_password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            onChange={handleChange("email")}
            className="form-control"
            value={email}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            onChange={handleChange("password")}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Confirm Password</label>
          <input
            type="password"
            onChange={handleChange("confirm_password")}
            className="form-control"
          />
        </div>

        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  const renderErrorMessages = (error) => {
    if (Array.isArray(error)) {
      return error.map((err, i) => (
        <div key={i}>
          {err}
          <br />
        </div>
      ));
    }
    return error;
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {renderErrorMessages(error)}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        New account is created. Please <Link to="/signin">Signin</Link>.
      </div>
    );
  };

  return (
    <Layout
      title="Signup Page"
      className="container col-md-8 offset-md-2"
      description="Node React E-Commerce App"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
