const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email:{
    type:String,
    require:true,
  },
  password:{
    type:String,
    require:true
  }
});

const UserModal = mongoose.model("user",userSchema)
module.exports = UserModal;
