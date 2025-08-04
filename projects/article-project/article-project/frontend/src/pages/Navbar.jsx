import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("User logged out successfully");
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-900/90 to-emerald-900/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-teal-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-teal-400 group-hover:text-teal-300 group-hover:scale-110 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-emerald-400 group-hover:from-teal-200 group-hover:to-emerald-300 transition-all duration-300">
              ArticleMaster
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className="text-teal-100 hover:text-teal-300 text-sm font-semibold uppercase tracking-wide relative group transition-all duration-300"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/myarticles"
              className="text-teal-100 hover:text-teal-300 text-sm font-semibold uppercase tracking-wide relative group transition-all duration-300"
            >
              My Articles
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {token && (
              <Link
                to="/addarticle"
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white px-5 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                + Add Article
              </Link>
            )}

            {token ? (
              <button
                onClick={handleLogout}
                className="text-teal-100 hover:text-red-400 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide relative group transition-all duration-300"
              >
                Logout
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-teal-100 hover:text-teal-300 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide relative group transition-all duration-300"
                >
                  Sign In
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white px-5 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-teal-200 hover:text-teal-300 rounded-full hover:bg-teal-800/50 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-teal-900/95 to-emerald-900/95 px-6 py-4 space-y-3 shadow-xl border-t border-teal-500/30 animate-slide-down">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-teal-100 hover:text-teal-300 text-sm font-semibold uppercase tracking-wide py-2 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/myarticles"
            onClick={() => setIsOpen(false)}
            className="block text-teal-100 hover:text-teal-300 text-sm font-semibold uppercase tracking-wide py-2 transition-all duration-300"
          >
            My Articles
          </Link>
          {token && (
            <Link
              to="/addarticle"
              onClick={() => setIsOpen(false)}
              className="block text-teal-100 hover:text-teal-300 text-sm font-semibold uppercase tracking-wide py-2 transition-all duration-300"
            >
              Add Article
            </Link>
          )}
          {token ? (
            <button
              onClick={handleLogout}
              className="block text-left text-red-400 hover:text-red-300 w-full text-sm font-semibold uppercase tracking-wide py-2 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                onClick={() => setIsOpen(false)}
                className="block text-teal-100 hover:text-teal-300 text-sm font-semibold uppercase tracking-wide py-2 transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white px-5 py-2.5 rounded-full text-center text-sm font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;