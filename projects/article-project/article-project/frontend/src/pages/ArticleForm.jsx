import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ArticleForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [article, setArticle] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3690/article/add",
        article,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message || "Article added successfully!");
      setArticle({ title: "", content: "", tags: "" });
      navigate("/myarticles");
    } catch (error) {
      console.error("Error adding article:", error);
      alert("Failed to add article. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900/90 to-emerald-900/90 p-6 sm:p-8 lg:p-12">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-teal-500/30 p-6 sm:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-emerald-400">
            Write New Article 📝
          </h1>
          <Link
            to="/myarticles"
            className="text-teal-100 hover:text-teal-300 font-medium transition-colors duration-300"
            aria-label="Back to My Articles"
          >
            ← Back to My Articles
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-teal-100 font-medium text-sm sm:text-base mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="e.g. The Future of JavaScript"
                className="w-full bg-teal-900/20 border border-teal-500/50 rounded-full px-4 py-3 text-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-teal-300/70 text-sm sm:text-base transition-all duration-300"
                value={article.title}
                onChange={(e) =>
                  setArticle({ ...article, title: e.target.value })
                }
                required
                aria-describedby="titleError"
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-teal-100 font-medium text-sm sm:text-base mb-2"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                placeholder="e.g. technology, programming"
                className="w-full bg-teal-900/20 border border-teal-500/50 rounded-full px-4 py-3 text-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-teal-300/70 text-sm sm:text-base transition-all duration-300"
                value={article.tags}
                onChange={(e) =>
                  setArticle({ ...article, tags: e.target.value })
                }
                required
                aria-describedby="tagsError"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-teal-100 font-medium text-sm sm:text-base mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                rows="8"
                placeholder="Write your article here..."
                className="w-full bg-teal-900/20 border border-teal-500/50 rounded-lg px-4 py-3 text-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-teal-300/70 text-sm sm:text-base transition-all duration-300"
                value={article.content}
                onChange={(e) =>
                  setArticle({ ...article, content: e.target.value })
                }
                required
                aria-describedby="contentError"
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              aria-label="Publish Article"
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;