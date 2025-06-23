const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    author:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
  image: {
    type: String,
    require: true,
  },
});

const BookModel = mongoose.model("allbooks",bookSchema);
module.exports = BookModel;
