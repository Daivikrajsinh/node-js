const express = require("express");
const UserModel = require("../models/userModel");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRoute.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    // Validate input fields
    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    console.log("Received registration request", req.body);

    // Check if username already exists
    let existingUserName = await UserModel.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({
        message: "Username already exists",
        success: false,
      });
    }

    let existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    console.log(existingUser, "already exists");

    // Check if password is strong enough
    if (password.length <= 3) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        success: false,
      });
    }

    let hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;
    console.log(hashPassword);
    const user = await UserModel.create(req.body);
    if (!user) {
      return res.status(400).json({
        message: "User not created",
        success: false,
      });
    }
    console.log("User Created", user);
    return res.status(201).json({
      message: "User Registered Successfully",
      success: true,
      user,
    });    

  } catch (error) {
    console.error("Registration Error:", error); // <--- ADD THIS
    return res.status(400).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "No User Found",
        success: false,
      });
    }
    console.log("User Found", user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.status(201).json({
        message: "User Login Successfully",
        success: true,
        token,
        user,
      });
    } else {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

module.exports = userRoute;
