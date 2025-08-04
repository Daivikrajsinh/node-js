const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
        success: false,
      });
    }

    console.log("Token Received:", token);

    // Extract and verify token
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    console.log("Decoded Token", decoded);

    if (!decoded || !decoded.user) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token structure",
        success: false,
      });
    }

    // Attach user to request object
    req.user = decoded.user;
    console.log("User Info from Token:", req.user);

    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

module.exports = authMiddleware;
