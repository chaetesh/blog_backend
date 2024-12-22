const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_secret_key";

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

module.exports = { authenticate, JWT_SECRET };