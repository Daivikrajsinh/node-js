const express = require("express");
const connection = require("./config/db");
const app = express();
const userRouter = require("./routes/userRouter");
const dashboardRouter = require("./routes/dashboardRouter");

const PORT = 3690; 
app.set("view engine", "ejs");
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static('assets'));
              
app.use("/userdata", userRouter); 
app.use("/dashboard",dashboardRouter);

app.listen(PORT, (error) => {  
  if (error) {           
    console.log(error);
  } else { 
    console.log("Server is running ",PORT);
    connection();
  }    
});   