import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3690/user/register",
        data
      );
      alert(response.data.message);
      setData({ userName: "", email: "", password: "" });
      navigate("/signin");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900/90 to-emerald-900/90 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 border border-teal-500/30">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-teal-400 group-hover:text-teal-300 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400 ml-3">
              ArticleMaster
            </h1>
          </div>
          <p className="text-teal-100 text-sm sm:text-base opacity-80">
            Join ArticleMaster to create, save, and manage your personal articles with ease.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="userName"
              className="block text-teal-100 font-medium text-sm sm:text-base mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              value={data.userName}
              onChange={(e) => setData({ ...data, userName: e.target.value })}
              placeholder="Enter your username"
              className="w-full bg-teal-900/20 border border-teal-500/50 rounded-full px-4 py-3 text-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-teal-300/70 text-sm sm:text-base transition-all duration-300"
              required
              aria-describedby="userNameError"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-teal-100 font-medium text-sm sm:text-base mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full bg-teal-900/20 border border-teal-500/50 rounded-full px-4 py-3 text-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-teal-300/70 text-sm sm:text-base transition-all duration-300"
              required
              aria-describedby="emailError"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-teal-100 font-medium text-sm sm:text-base mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Create a password"
              className="w-full bg-teal-900/20 border border-teal-500/50 rounded-full px-4 py-3 text-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-teal-300/70 text-sm sm:text-base transition-all duration-300"
              required
              aria-describedby="passwordError"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Sign Up
          </button>

          <div className="text-center text-teal-100 text-sm">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-teal-300 hover:text-teal-200 font-medium transition-colors duration-300"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;