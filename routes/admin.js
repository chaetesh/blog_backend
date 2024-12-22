const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../middleware/auth");

const router = express.Router();

// Admin signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new User({ username, password: hashedPassword });
  await admin.save();
  res.send({ message: "Admin registered" });
});

// Admin login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await User.findOne({ username });
  if (!admin) return res.status(404).send({ message: "Admin not found" });

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) return res.status(403).send({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: admin._id, username: admin.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.send({ message: "Login successful", token });
});

module.exports = router;