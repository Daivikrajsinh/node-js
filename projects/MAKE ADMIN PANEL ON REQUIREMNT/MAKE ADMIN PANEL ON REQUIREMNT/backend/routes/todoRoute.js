const express = require("express");
const TodoModel = require("../model/todoModel");
const auth = require("../middlewere/auth");
const todolistRoute = express.Router();

todolistRoute.get("/",auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const todos = await TodoModel.find({ authorId: userId });

    return res.status(200).json({
      message: "User's Todos fetched",
      success: true,
      todos,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }  
});

todolistRoute.post("/",  async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ message: "Task is required" });
    }

    const newTodo = await TodoModel.create({
      task,
      authorId: req.user._id,
    });

    return res.status(201).json({
      message: "Todo Created",
      todo: newTodo,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


module.exports = todolistRoute;
