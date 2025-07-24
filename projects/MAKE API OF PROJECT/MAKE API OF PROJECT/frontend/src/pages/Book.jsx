import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

const Book = () => {
  const [book, setBook] = useState({
    title: "",
    price: "",
    description: "",
    language: "",
    rating: "0",
  });

  const [bookArray, setBookArray] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const { token } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3690/book", book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message);
      fetchData();
    } catch (error) {
      console.log(error);
    }
    setBook({
      title: "",
      price: "",
      description: "",
      language: "",
      rating: "0",
    });
  }

  async function fetchData() {
    try {
      let response = await axios.get("http://localhost:3690/book", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookArray(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>

        <div
          className={`shadow-xl rounded-lg overflow-hidden transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Header */}
          <div
            className={`py-6 px-8 ${
              darkMode ? "bg-indigo-900" : "bg-indigo-600"
            }`}
          >
            <h1 className="text-3xl font-bold text-white">Book Store</h1>
          </div>

          {/* Form and Book List Container */}
          <div className="md:flex">
            {/* Form Section */}
            <div
              className={`w-full md:w-1/2 p-8 ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } border-r`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-1`}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Title"
                    value={book.title}
                    onChange={(e) =>
                      setBook({ ...book, title: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-1`}
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    value={book.price}
                    onChange={(e) =>
                      setBook({ ...book, price: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-1`}
                  >
                    Description
                  </label>
                  <textarea
                    value={book.description}
                    onChange={(e) =>
                      setBook({ ...book, description: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px] ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="language"
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-1`}
                  >
                    Language
                  </label>
                  <select
                    value={book.language}
                    onChange={(e) =>
                      setBook({ ...book, language: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <option value="">Select a language</option>
                    <option value="English">Gujarati</option>
                    <option value="Spanish">English</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="rating"
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-1`}
                  >
                    Rating (0-5): {book.rating}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={book.rating}
                      onChange={(e) =>
                        setBook({ ...book, rating: e.target.value })
                      }
                      className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                        darkMode ? "bg-gray-600" : "bg-gray-200"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {book.rating}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                    darkMode
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  Add Book
                </button>
              </form>
            </div>

            {/* Book List Section */}
            <div className="w-full md:w-1/2 p-8">
              <h2
                className={`text-2xl font-bold mb-6 pb-2 ${
                  darkMode
                    ? "text-gray-300 border-gray-700"
                    : "text-gray-800 border-gray-200"
                } border-b`}
              >
                Your Books
              </h2>

              {bookArray.length === 0 ? (
                <div
                  className={`text-center py-12 ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  No books added yet
                </div>
              ) : (
                <div className="space-y-6">
                  {bookArray.map((book) => (
                    <div
                      key={book._id}
                      className={`p-6 rounded-lg transition-shadow hover:shadow-md ${
                        darkMode
                          ? "bg-gray-700 hover:shadow-indigo-900"
                          : "bg-gray-50 hover:shadow-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h3
                          className={`text-xl font-semibold ${
                            darkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {book.title}
                        </h3>
                        <span
                          className={`py-1 px-3 rounded-full text-sm font-medium ${
                            darkMode
                              ? "bg-indigo-900 text-indigo-200"
                              : "bg-indigo-100 text-indigo-800"
                          }`}
                        >
                          ${book.price}
                        </span>
                      </div>

                      <p
                        className={`mt-2 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {book.description}
                      </p>

                      <div className="mt-4 flex justify-between items-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            darkMode
                              ? "bg-blue-900 text-blue-200"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {book.language}
                        </span>

                        <div className="flex items-center">
                          {[...Array(5)].map((_, starIndex) => (
                            <svg
                              key={starIndex}
                              className={`w-5 h-5 ${
                                starIndex < book.rating
                                  ? "text-yellow-400"
                                  : darkMode
                                  ? "text-gray-500"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span
                            className={`ml-1 text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            ({book.rating})
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
