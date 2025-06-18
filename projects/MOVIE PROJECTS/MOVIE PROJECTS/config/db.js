const mongoose = require("mongoose");

const connections = async () => {

await mongoose.connect("mongodb://127.0.0.1:27017/movie");
    console.log("MongoDB connected");

};

module.exports = connections;
    