const express = require("express");
const auth = require("../middlewere/auth");
const BookModel = require("../models/bookModel");
const bookRoute = express.Router();

bookRoute.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const book = await BookModel.find({ authorId: userId });
    // .sort({ createdAt: -1 }); latest first

    return res.status(200).json({
      message: "Book fetched successfully",
      data: book,
    }); 
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    return res.status(500).json({
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
});

bookRoute.post("/", auth, async (req, res) => {
  try {
    const { title, price, description, language, rating } = req.body;
    const myTask = await BookModel.create({
      authorId: req.user._id,
      title,
      price,
      description,
      language,
      rating,
    });

    console.log("Created Task:", myTask);
    console.log(myTask);
    return res.status(201).json({
      message: "Book added successfully",
      data: myTask,
    });
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
});

module.exports = bookRoute;
