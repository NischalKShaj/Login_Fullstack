// importing the modules for the files
const jwt = require("jsonwebtoken");

// setting up the user secret key
const userSecret = "user-secret-key";

// setting up the jwt token for user
module.exports.authenticateUserJwt = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
  jwt.verify(token, userSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
