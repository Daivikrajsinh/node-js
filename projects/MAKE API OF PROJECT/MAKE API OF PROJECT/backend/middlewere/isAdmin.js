const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded:", decoded);

    const user = await UserModel.findById(decoded.user_id);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Admin Access Required" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports = isAdmin;
