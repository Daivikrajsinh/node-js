import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router";

const Logout = () => {
  const { logout } = useAuth();
  useEffect(() => {
    alert("logout successfully");
    logout();
  }, [logout]);
  return <Navigate to="/signin" />;
};

export default Logout;
