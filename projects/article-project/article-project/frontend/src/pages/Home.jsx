import React from "react";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "The Art of Mindful Living",
    summary:
      "Discover how mindfulness can transform your everyday life with simple habits and focused awareness.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Top 10 Travel Destinations for 2025",
    summary:
      "Explore the most breathtaking places you must visit in 2025—from hidden gems to iconic landmarks.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.wbbKYhZ0NNeAS0K-sb-DZQHaEO?pid=Api&P=0&h=180",
  },
  {
    id: 3,
    title: "Mastering JavaScript in 30 Days",
    summary:
      "A practical roadmap and key tips to help you become a confident JavaScript developer.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.8u5JhWypErDIPrbnzhC3CgHaHa?pid=Api&P=0&h=180",
  },
  {
    id: 4,
    title: "How to Build a Healthy Morning Routine",
    summary:
      "Start your day strong with scientifically backed habits to boost energy, focus, and mood.",
    image:
      "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=800&q=80",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900/90 to-emerald-900/90 text-teal-100 py-12 px-4 sm:px-6 lg:px-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-emerald-400 animate-pulse-subtle">
        📰 Latest Articles
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {articles.map((article) => (
          <div
            key={article.id}
            className="group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg border border-teal-500/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-6 relative z-10">
              <h2 className="text-xl sm:text-2xl font-bold text-teal-300 mb-3 line-clamp-2 group-hover:text-teal-200 transition-colors duration-300">
                {article.title}
              </h2>
              <p className="text-sm text-teal-100 opacity-80 line-clamp-3 mb-4">
                {article.summary}
              </p>
              <Link
                to={`/article/${article.id}`}
                className="inline-block mt-auto py-2 px-5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label={`Read more about ${article.title}`}
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;