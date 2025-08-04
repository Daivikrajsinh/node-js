import { createContext, useContext, useState } from "react";

const AuthContext = createContext(); // globally data create krne k liyae

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = (token) => {
    // token parameter
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    // logout function
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
