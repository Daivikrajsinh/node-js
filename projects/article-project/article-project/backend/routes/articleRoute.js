const express = require("express");
const authMiddleware = require("../middleware/auth");
const ArticleModel = require("../models/articleModel");
const articleRoute = express.Router();

// GET /article - Get all articles for a user
articleRoute.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("User ID from authMiddleware:", userId);
    const articles = await ArticleModel.find({
      author: userId,
    });
    console.log("Fetched articles:", articles);
    res.status(200).json({
      message: "Fetched Articles",
      success: true,
      articles,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /article/:id - Fetch article details for editing/viewing
articleRoute.get("/:id", async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ article });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /article/add - Add new article
articleRoute.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, content, image, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        message: "Please fill all the required fields",
        success: false,
      });
    }
    console.log("Received article request", req.body);

    const article = await ArticleModel.create({
      title,
      content,
      tags,
      author: req.user._id,
    });
    console.log("Article created", article);

    return res.status(201).json({
      message: "Article added successfully",
      success: true,
      article,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error adding article",
      success: false,
      error: error.message,
    });
  }
});

// DELETE /article/:id - Delete an article
articleRoute.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await ArticleModel.findByIdAndDelete(id);
    res.status(202).json({
      message: "Article Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Internal Server Error",
    });
  }
});

// PUT /article/:id - Update an article
articleRoute.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Updating article with ID:", id);
    console.log("Received update data:", req.body);

    const article = await ArticleModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
        success: false,
        article,
      });
    }

    return res.status(200).json({
      message: "Article updated successfully",
      success: true,
      article,
    });
  } catch (error) {
    console.log("Error updating article:", error);
    return res.status(400).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
});

module.exports = articleRoute;
