const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    if (!decoded || !decoded.user) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Authentication Failed", error: error.message });
  }
};

module.exports = auth;
