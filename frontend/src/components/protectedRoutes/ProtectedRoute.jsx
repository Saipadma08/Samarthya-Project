import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole, children }) => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;