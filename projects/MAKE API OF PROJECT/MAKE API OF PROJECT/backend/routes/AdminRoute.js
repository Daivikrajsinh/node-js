const express = require("express");
const UserModel = require("../models/userModel");
const isAdmin = require("../middlewere/isAdmin");
const adminRoute = express.Router();

adminRoute.get("/getallusers", isAdmin, async (req, res) => {
  try {
    let users = await UserModel.find();
    console.log(users);
    if (!users) {
      return res.status(400).json({
        message: "No User Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: users,

      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "BAD REQUEST",
      success: false,
    });
  }
});

module.exports = adminRoute;
