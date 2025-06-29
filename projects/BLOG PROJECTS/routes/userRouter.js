const express = require("express");
const UserModal = require("../models/userModel");
const userRouter = express.Router();
const nodemailer = require("nodemailer");
 
userRouter.get("/signin", (req, res) => {
  return res.render("signIn");
});

userRouter.get("/signup", (req, res) => {
  res.render("signUp");
});
 
userRouter.post("/signup-user", async (req, res) => {
  try {

  const userData =  await UserModal.create(req.body);
    console.log(userData);
    console.log("Registration Successfull");
    res.redirect("/userdata/signin");
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("req.body", email, password);

  try {
    let userData = await UserModal.findOne({ email });
    console.log("userdata", userData);

    if (userData.password == password) {
      console.log("Login Successfull")
      res.redirect("/dashboard");
    } else {
      console.log("invalid password");
      res.redirect("/userdata/signin");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/userdata/signin");
  }
});

module.exports = userRouter;
