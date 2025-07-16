const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/userRoute");
const todolistRoute = require("./routes/todoRoute");
const cors = require("cors")
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use("/todolist",todolistRoute);

app.listen(process.env.PORT,(error)=>{
    if(error){
        console.log("Server is not connected",error);
        return;
    }
    connection();
    console.log("Server is connected",process.env.PORT)
})   