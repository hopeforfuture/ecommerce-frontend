import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "sncn86@gmail.com",
    password: "admin123",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signInForm = () => {
    return (
      <form>
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
            value={password}
          />
        </div>

        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {Array.isArray(error)
          ? error.map((err, i) => (
              <div key={i}>
                {err}
                <br />
              </div>
            ))
          : error}
      </div>
    );
  };

  const showLoading = () => {
    if (loading) {
      return (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      );
    }
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }
    if (isAuthenticated() && user.role === 1) {
      return <Navigate to="/admin/dashboard" />;
    }
    if (isAuthenticated() && user.role === 0) {
      return <Navigate to="/user/dashboard" />;
    }
  };

  return (
    <Layout
      title="Signin Page"
      className="container col-md-8 offset-md-2"
      description="Node React E-Commerce App"
    >
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
