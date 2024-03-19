// importing the requried files
const jwt = require("jsonwebtoken");

// setting the admin authentication
module.exports.authenticateAdminJwt = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("token in middleware", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized admin" });
  }
  jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
