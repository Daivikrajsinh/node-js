const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    releaseYear: {
        type: Number,
        required: true,
    },
    
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
    },
    duration: {
        type: String, 
    }
});

const MovieModel = mongoose.model("movie-data",movieSchema)
module.exports = MovieModel;