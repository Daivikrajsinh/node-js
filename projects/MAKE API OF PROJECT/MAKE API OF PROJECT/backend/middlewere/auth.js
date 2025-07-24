const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        message: "Unauthorized",
        success: false,
      });
    }
    console.log(token);
    let decoded = jwt.verify(token.split(" ")[1],process.env.SECRET_KEY);
    console.log(decoded);
    if (!decoded) {
      return res.status(400).json({
        message: "Invalid Token",
        success: false,
      });
    }
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "BAD REQUEST",
      success: false,
    });
  }
};

module.exports = auth;
