import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// roles => array of allowed roles for this route
const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user")); // assume user object saved on login

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // render child routes
};

export default ProtectedRoute;
