const mongoose = require("mongoose");
const connection = async()=>{
    await mongoose.connect(process.env.MONGO_DB);
    console.log("DB CONNECTED")
}
module.exports = connection