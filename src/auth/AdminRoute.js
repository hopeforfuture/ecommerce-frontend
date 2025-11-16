// src/auth/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ allowedRoles }) => {
  const auth = isAuthenticated();

  if (!auth) {
    return <Navigate to="/signin" replace />;
  }

  const { user } = auth;

  if (!allowedRoles.includes(user.role)) {
    // Redirect admins to admin dashboard if they try to access user pages
    return user.role === 1 ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/user/dashboard" replace />
    );
  }

  // If role is allowed, render the child routes
  return <Outlet />;
};

export default AdminRoute;
