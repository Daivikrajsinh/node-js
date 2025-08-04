import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3690/user/login", data);
      login(response.data.token);
      alert(response.data.message);
      navigate("/myarticles");
      setData({ email: "", password: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Sign in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-teal-100 to-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md backdrop-blur-md bg-white/70 border border-white/30 shadow-2xl rounded-2xl p-8 sm:p-10 transition-all duration-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-teal-700 drop-shadow-sm">Welcome Back</h1>
          <p className="text-sm text-gray-600 mt-1">Log in to manage your articles</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 bg-white/80 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-800"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-white/80 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-800"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-teal-600 hover:text-teal-500 font-medium">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-teal-600 hover:text-teal-500 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
