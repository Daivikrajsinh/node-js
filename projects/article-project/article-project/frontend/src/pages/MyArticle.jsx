import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const MyArticle = () => {
  const { token } = useAuth();
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:3690/article", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArticles(res.data.articles);
      console.log("Fetched articles:", res.data.articles);
    } catch (err) {
      console.log("Failed to fetch articles:", err);
      alert("Failed to fetch articles. Please try again.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/updatearticle/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await axios.delete(`http://localhost:3690/article/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticles(articles.filter((article) => article._id !== id));
        alert("Article deleted successfully!");
      } catch (err) {
        console.error("Failed to delete article:", err.message);
        alert("Failed to delete article. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Please login to view your articles.");
      navigate("/signin");
    } else {
      fetchArticles();
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900/90 to-emerald-900/90 text-teal-100 py-12 px-4 sm:px-6 lg:px-12">
      <header className="bg-white/10 backdrop-blur-lg shadow-xl border border-teal-500/30 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-emerald-400">
            My Articles
          </h1>
          <Link
            to="/addarticle"
            className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 rounded-full text-sm font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            + Add Article
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        {articles.length === 0 ? (
          <div className="text-center py-12 text-teal-100 opacity-80 text-lg sm:text-xl">
            No articles found. Start by adding one!
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div
                key={article._id}
                className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-teal-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-teal-300 mb-3 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-sm text-teal-100 opacity-80 line-clamp-3 mb-4">
                  {article.content}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-teal-400 italic">
                    #{article.tags || "No tags"}
                  </span>
                  <div className="space-x-4">
                    <button
                      onClick={() => handleEdit(article._id)}
                      className="text-sm text-teal-300 hover:text-teal-200 font-semibold transition-colors duration-300"
                      aria-label={`Edit article ${article.title}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(article._id)}
                      className="text-sm text-red-400 hover:text-red-300 font-semibold transition-colors duration-300"
                      aria-label={`Delete article ${article.title}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyArticle;