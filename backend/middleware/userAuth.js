// Importing the modules for the files
const jwt = require("jsonwebtoken");

// Setting up the JWT token for user
module.exports.authenticateUserJwt = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("token in middleware", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
