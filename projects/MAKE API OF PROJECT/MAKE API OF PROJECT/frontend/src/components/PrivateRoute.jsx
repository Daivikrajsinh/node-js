import { Navigate } from "react-router";
import { useAuth } from "../context/authContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signin"  />;
};


export default PrivateRoute;
