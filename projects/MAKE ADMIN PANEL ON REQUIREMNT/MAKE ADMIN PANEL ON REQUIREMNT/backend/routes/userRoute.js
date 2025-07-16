const express = require("express");
const UserModel = require("../model/userModel");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "Show user",
    success: true,
  });
});

userRouter.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    let hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;
    // console.log(hashPassword);

    if (userName == "" || email == "" || password == "") {
      return res.status(400).json({
        message: "Please Fill Required Fields",
        success: false,
      });
    }

    await UserModel.create(req.body);

    console.log(req.body);
    return res.status(201).json({
      message: "User Create Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Bad Request",
      success: false,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(200).json({
        message: "No User Found",
        success: false,
      });
    }

    if (await bcrypt.compare(password,user.password)) {
      let token = jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      console.log(token);
      return res.status(200).json({
        message: "Login Successfull",
        token,
      });
    } else {
      return res.status(404).json({
        message: "Invalid password",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Bad Request",
      success: false,
    });
  }
});

module.exports = userRouter;
