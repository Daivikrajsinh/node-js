import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    alert("Please log in to access this page.");
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoute;
