import React from "react";
import { Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import UpdateArticle from "./pages/UpdateArticle";
import ArticleForm from "./pages/ArticleForm";
import MyArticle from "./pages/MyArticle";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/myarticles"
          element={
            <PrivateRoute>
              <MyArticle />
            </PrivateRoute>
          }
        />
        <Route path="/addarticle" element={<ArticleForm />} />
        <Route path="/updatearticle/:id" element={<UpdateArticle />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
