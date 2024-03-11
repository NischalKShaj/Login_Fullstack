// importing the requried files
const jwt = require("jsonwebtoken");

// setting the admin secret key
const adminSecret = "admin-secret-key";

// setting the jwt token for the admin
module.exports.authenticateAdminJwt = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized admin" });
  }
  jwt.verify(token, adminSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
