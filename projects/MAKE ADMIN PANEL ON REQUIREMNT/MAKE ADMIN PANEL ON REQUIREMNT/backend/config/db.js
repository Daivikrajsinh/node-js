const mongoose = require("mongoose");

const connection  = async (req,res)=>{
    await mongoose.connect(process.env.MONGO_DB)
    console.log("DB IS CONNECTED");
}

module.exports = connection;
