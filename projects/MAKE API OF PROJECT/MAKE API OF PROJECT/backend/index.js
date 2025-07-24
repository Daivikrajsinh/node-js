const express = require("express");
const connection = require("./config/db");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
const bookRoute = require("./routes/bookRoute");
const adminRoute = require("./routes/AdminRoute");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/book", bookRoute);
app.use("/admin", adminRoute);
app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log("Server is not connected");
    return;
  }
  connection();
  console.log("Server is connected", process.env.PORT);
});
