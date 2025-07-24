const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  title: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  language: {
    type: String,
    default: "English", 
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
});

const BookModel = mongoose.model("books", bookSchema);
module.exports = BookModel;
